import React, { useState, useEffect } from "react";
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";

import { Trash2 } from "react-feather";

function Room() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
 
  useEffect(() => {
    getMessages();

   const unsubscribe =  client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        // Handle real-time updates here if needed
        // console.log('this is the response', response)

        if (
          response.events.includes("databases.*.collections.*.documents.*.create")
        ) {
          console.log("A MESSAGE WAS CREATED ❤️");
          setMessages(prevState => [response.payload, ...prevState]);
        }
    
        if (
          response.events.includes("databases.*.collections.*.documents.*.delete")
        ) {
          console.log("A MESSAGE WAS DELETED ❤️");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }


      }
    );

    return () => {
      unsubscribe(); 
    }   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
      user_id: ID.unique(), // Only added this required field
    };

    try {
      let response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        ID.unique(),
        payload
      );

      // setMessages((prevState) => [response, ...messages]);
      console.log("CREATED DOCUMENT:", response); // Changed console log message
      setMessageBody("");
    } catch (error) {
      console.error("CREATION ERROR:", error); // Added error logging
    }
  };

  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        [Query.orderDesc("$createdAt"), Query.limit(20)]
      );

      console.log("FETCHED MESSAGES:", response); // Changed console log message

      setMessages(response.documents);
    } catch (error) {
      console.error("FETCH ERROR:", error); // Changed error message
    }
  };



  const deleteMessage = async (message_id) => {
    databases.deleteDocument(
      DATABASE_ID, // databaseId
      COLLECTION_ID_MESSAGES, // collectionId
      message_id // documentId
    );
   
  };

  return (
    <main className="container">
      <div className="room-container">
        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="say something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input type="submit" value="Send" className="btn btn--secondary" />
          </div>
        </form>

        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString()}
                </small>

                <Trash2
                  className="delete--btn"
                  onClick={() => {
                    deleteMessage(message.$id);
                  }}
                />
              </div>

              <div className="message--body">
                <span className="message-text">{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Room;
