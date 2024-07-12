type FormProps = {
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  sendMessage: any
}

const Form = (props: FormProps) => {
  // 再生
  const ReadPlay = () => {
    // let readElem = document.querySelector<HTMLElement>('#root p')!;
    // let readElemText: string = readElem.textContent as string;
    // let uttr = new SpeechSynthesisUtterance(readElemText);
    // window.speechSynthesis.speak(uttr);

    let readElem = document.querySelectorAll<HTMLElement>('#root p')!;
    let readElemText: string = '';
    readElem.forEach(function(elem) {
      readElemText += elem.textContent as string;
    })
    let uttr = new SpeechSynthesisUtterance(readElemText);
    window.speechSynthesis.speak(uttr);
  }
  // 停止
  const ReadStop = () => {
    window.speechSynthesis.pause();
  }
  // 再開
  const ReadRestart = () => {
    window.speechSynthesis.resume();
  }

  return (
    <form >
      <input
        type="input"
        value={props.inputText}
        onChange={(e) => props.setInputText(e.target.value)}
      />
      <button onClick={props.sendMessage}>送信</button>
      <div id="play-btn" onClick={ReadPlay}>再生</div>
      <div id="stop-btn" onClick={ReadStop}>停止</div>
      <div id="restart-btn" onClick={ReadRestart}>再開</div>
    </form>
  )
}

export default Form