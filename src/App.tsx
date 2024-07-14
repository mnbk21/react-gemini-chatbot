import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import logoImg from "./assets/logo.png";
import iconPlayPcImg from "./assets/icon_play_pc.png";
import iconStopPcImg from "./assets/icon_stop_pc.png";
import iconRestartPcImg from "./assets/icon_restart_pc.png";
import Form from "./Form";



import './App.css'

function App() {

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true);
    const greet = document.getElementById('greet')!;
    const guidance = document.getElementById('guidance')!;
    const answer = document.getElementById('answer')!;
    greet.style.display = 'none';
    guidance.style.display = 'none';
    answer.style.display = 'block';
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
    <div className="container">

      <main className="main">
        <header className="header">
          <h1 className="site-title"><img className="site-title__img" src={logoImg} alt="Gemini Chat App" width="514" height="55" /></h1>
        </header>
        <div id="contents" className="contents">
          <div id="greet" className="greet">
            <p id="greet__text" className="greet__text">初めまして！<br/>お話ししたい事を何でも入力して下さい。</p>
          </div>
          <div id="guidance" className="guidance">
            <ul className="guidance__list-wrap">
              <li className="guidance__list">
                <img className="guidance__list-img" src={iconPlayPcImg} alt="" width="54" height="56"/>
                <span className="guidance__list-text">ボタンで音声を再生します。</span>
              </li>
              <li className="guidance__list">
                <img className="guidance__list-img" src={iconStopPcImg} alt="" width="54" height="56"/>
                <span className="guidance__list-text">ボタンで音声を停止します。</span>
              </li>
              <li className="guidance__list">
                <img className="guidance__list-img" src={iconRestartPcImg} alt="" width="54" height="56"/>

                <span className="guidance__list-text">ボタンで音声を再開します。</span>
              </li>
            </ul>
          </div>

          <div id="answer" className="answer">
            { isLoading ? <span className="loading">現在、問い合わせ中です...</span> : null}
            <ReactMarkdown>{responseMessage}</ReactMarkdown>  
          </div>

        </div>


        <div className="form-area">
          <Form inputText={inputText} setInputText={setInputText} sendMessage={sendMessage}/>
        </div>
      </main>
      <div className="bg-img"></div>
    </div>
  )
}

export default App
