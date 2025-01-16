import iconPlayImg from "./assets/icon_play.png";
import iconStopImg from "./assets/icon_stop.png";
import iconRestartImg from "./assets/icon_restart.png";
import iconSendImg from "./assets/icon_send.png";

type FormProps = {
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  sendMessage: any
}

const Form = (props: FormProps) => {

  // Chromeで音声リストを事前に取得
  window.speechSynthesis.getVoices();

  // 再生
  const ReadPlay = () => {
    // let readElem = document.querySelector<HTMLElement>('#root p')!;
    // let readElemText: string = readElem.textContent as string;
    // let uttr = new SpeechSynthesisUtterance(readElemText);
    // window.speechSynthesis.speak(uttr);

    let readElem = null;
    let readElemText: string = '';
    let answerElem = document.getElementById('answer')!;

    if (answerElem.hasChildNodes()) {// 子要素があれば
      readElem = document.querySelectorAll<HTMLElement>('#answer p, #answer li')!;
      readElem.forEach(function(elem) {
        readElemText += elem.textContent as string;
      })
    } else { // 子要素が無ければ
      readElem = document.getElementById('greet__text')!;
      readElemText += readElem.textContent as string;
    }

    // let uttr = new SpeechSynthesisUtterance(readElemText);


    window.speechSynthesis.getVoices()[3];
    let uttr = new SpeechSynthesisUtterance(readElemText);
    let voice = window.speechSynthesis.getVoices()[3];
    uttr.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(uttr);

    // window.speechSynthesis.onvoiceschanged = () => {
    //   alert('テスト')
    //   let uttr = new SpeechSynthesisUtterance(readElemText);
    //   let voice = window.speechSynthesis.getVoices()[3];
    //   uttr.voice = voice;
    //   window.speechSynthesis.cancel();
    //   window.speechSynthesis.speak(uttr);
    // };

    // let voice = window.speechSynthesis.getVoices()[2];
    // uttr.voice = voice;
    // window.speechSynthesis.cancel();
    // window.speechSynthesis.speak(uttr);
  }
  // 停止
  const ReadStop = () => {
    window.speechSynthesis.pause();
  }
  // 再開
  const ReadRestart = () => {
    window.speechSynthesis.resume();
  }
  // クリック時のリアクション
  const formBtnOn = (event : any) => {
    event.currentTarget.classList.toggle('form__btn-img--on');
    setTimeout(() => {
      document.querySelector('.form__btn-img--on')!.classList.remove('form__btn-img--on');
    }, 300);
  };

  return (
    <form className="form">
      <div className="form__btn-wrap">
        <div id="play-btn" onClick={ReadPlay} className="form__btn">
          <img className="form__btn-img" src={iconPlayImg} alt="" width="54" height="56" onClick={formBtnOn}/>

        </div>
        <div id="stop-btn" onClick={ReadStop} className="form__btn">
          <img className="form__btn-img" src={iconStopImg} alt="" width="54" height="56" onClick={formBtnOn}/>
        </div>
        <div id="restart-btn" onClick={ReadRestart} className="form__btn">
          <img className="form__btn-img" src={iconRestartImg} alt="" width="54" height="56" onClick={formBtnOn}/>
        </div>
      </div>
      <input
        className="form__input-text"
        type="input"
        value={props.inputText}
        placeholder="お話ししたい事を入力してください"
        onChange={(e) => props.setInputText(e.target.value)}
      />
      <button className="form__submit" onClick={props.sendMessage}>
        <img className="form__btn-img" src={iconSendImg} alt="" width="30" height="30" onClick={formBtnOn}/>
      </button>

    </form>
  )
}

export default Form