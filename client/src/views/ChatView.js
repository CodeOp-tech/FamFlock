import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import ChatList from "../components/ChatList";
import Api from "../helpers/Api";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";
import ChatCss from "./ChatView.css";

function ChatView(props) {
  // source: Jim's WebSockets Demo

  const [messages, setMessages] = useState([]); // useState 1
  const [text, setText] = useState(""); // useState 2
  const [reactions, setReactions] = useState([]); // useState 3

  const pusherRef = useRef(null);
  const socketIdRef = useRef(null);

  // Connect to Pusher; called once, when component mounts
  useEffect(() => {
    Pusher.logToConsole = false; // very useful for debugging!

    // Establish connection with Pusher
    // pusherKey is stored in client's .env file
    let pusherKey = process.env.REACT_APP_PUSHER_KEY;
    let options = { cluster: "eu", forceTLS: true };
    pusherRef.current = new Pusher(pusherKey, options);

    // Save socket ID; we send it to server so we don't get sent our own messages
    pusherRef.current.connection.bind("connected", () => {
      socketIdRef.current = pusherRef.current.connection.socket_id;
    });

    // Cleanup function: Disconnect when component unmounts
    return () => {
      pusherRef.current.disconnect();
    };
  }, []);

  // Subscribe to a channel; called whenever participants change
  useEffect(() => {
    // Return immediately if sender/receiver are the same
    if (props.senderId === props.groupId) {
      return;
    }

    // Create channel name from groupId
    let channelName = "channel-" + props.groupId;

    // Subscribe to channel
    let channel = pusherRef.current.subscribe(channelName);

    // Listen for messages broadcast on channel
    channel.bind("message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });

    // Cleanup function: Unsubscribe when participant changes
    return () => {
      pusherRef.current.unsubscribe(channelName);
    };
  }, [props.senderId, props.groupId]);

  useEffect(() => {
    // Call whenever participants change
    getRecentMessages();
    props.setSenderIdCb(props.user.id);
  }, [props.senderId, props.groupId]);

  useEffect(() => {
    fetchReactions();
  }, []);

  // Load previous messages from DB
  async function getRecentMessages() {
    let options = {
      method: "GET",
    };

    try {
      let response = await fetch(`/chat/${props.groupId}`, options);

      if (response.ok) {
        let data = await response.json();
        setMessages(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
    }
  }

  // POST user-entered text to server as message
  async function sendMessage(text) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, socketId: socketIdRef.current }),
    };

    try {
      // Send text and socketId to our server
      let response = await fetch(
        `/chat/${props.groupId}/${props.senderId}`,
        options
      );

      // Server responds with "complete" msg (including ID and date/time)
      if (response.ok) {
        let completeMsg = await response.json();
        setMessages((messages) => [...messages, completeMsg]);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
    }
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(text);
    setText("");
  }

  async function newReaction(reaction, FK_user_id, FK_message_id) {
    let myresponse = await Api.newReaction(reaction, FK_user_id, FK_message_id);
    if (myresponse.ok) {
      setReactions(myresponse.data.data);
      getRecentMessages();
    } else {
      console.log("response not ok");
    }
  }

  async function fetchReactions() {
    let myresponse = await Api.getReactions();
    if (myresponse.ok) {
      setReactions(myresponse.data);
    } else {
      console.log("response not ok");
    }
  }

  return (
    <div>
      <TripByIdNav />

      <div className="tripById">
        <div className="">
          <h1 className="heading">Chat</h1>
          <ChatList
            messages={messages}
            user={props.user}
            groupId={props.groupId}
            users={props.users}
            newReactionCb={newReaction}
            reactions={reactions}
          />
          <div>
            <form onSubmit={handleSubmit} className="row chatform">
              <input
                className="col form-control my-3"
                type="text"
                // className="form-control"
                name="text"
                value={text}
                onChange={handleChange}
                required
              />
              <button className="btn btn-primary col col-md-1 sendbtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
