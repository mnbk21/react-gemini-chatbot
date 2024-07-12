import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Form from "./Form";

import './App.css'

function App() {

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API}`,

        {
          contents:[
            {
              parts:[
                {
                  text: inputText
                }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      const responseContent = response.data.candidates[0].content;
      const responseParts = responseContent.parts.map((part: { text: string }) => part.text).join("\n");
      setResponseMessage(responseParts);
      setIsLoading(false);
    } catch (error) {
      console.error(`Gemini API has error occured: ${error}`);
    }
  };

  return (
    <div>
      <h1>Gemini Chat Bot</h1>
      <div>
        { isLoading ? <p className="loading">現在、問い合わせ中です...</p> : null}
        <ReactMarkdown>{responseMessage}</ReactMarkdown>
      </div>
      <div>
        <Form inputText={inputText} setInputText={setInputText} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default App
