import React, { useState } from 'react'

export default function TextForm(props) {
    const handleOnUpperClick = () => {
        // console.log("Uppercase was clicked: " + text);
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UPPER CASE", "success");
    }
    const handleOnLowerClick = () => {
        let newText=text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lower case", "success");
    }
    const handleOnClearClick = () => {
        let newText="";
        setText(newText);
        props.showAlert("Cleared the input", "success");
    }
    const handleOnCopyClick = () => {
        var newText=document.getElementById("myBox");
        newText.select();
        navigator.clipboard.writeText(newText.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Copied to clipboard!", "success");
    }
    const handleOnAlternatingClick = () => {
        let newText="";
        for(var i=0; i<text.length; i+=2){
            newText+=text.charAt(i).toLowerCase();
            newText+=text.charAt(i+1).toUpperCase();
        }
        //below code is so that every word in alternating case starts from lowercase and spaces are not counted while transforming
        // for(var i=0; i<wordsArray.length; i++){
        //     for(var j=0; j<wordsArray[i].length; j+=2){
        //         newText+=wordsArray[i].charAt(j).toLowerCase();
        //         newText+=wordsArray[i].charAt(j+1).toUpperCase();
        //     }
        //     if(newText.charAt(newText.length-1)!=="."){
        //         newText+=" ";
        //     }
        // }
        setText(newText);
        props.showAlert("Converted to aLtErNaTiNg cAsE", "success");
    }
    const handleOnSentenceClick = () => {
        let newText="";
        console.log(sentencesArray);
        for(var i=0; i<sentencesArray.length; i++){
            newText+=sentencesArray[i].charAt(0).toUpperCase();
            for(var j=1; j<sentencesArray[i].length; j++){
                newText+=sentencesArray[i].charAt(j).toLowerCase();
            }
            newText+=". ";
        }
        setText(newText);
        props.showAlert("Converted to Sentence case.", "success");
    }
    const handleOnChange = (event) => {
        // console.log("On change");
        setText(event.target.value);
    }
    const [text, setText]=useState("");
    //text is called 'state variable'
    // text="new text"; //Wrong way to update state
    // setText("new text"); //Correct way to update state
    let tempText=text.trim();
    let wordsArray=tempText.split(" ");
    for(var i=0; i<wordsArray.length; i++){
        if(wordsArray[i]===""){
            wordsArray.splice(i, 1);
            i--;
        }
    }
    let sentencesArray=tempText.split(".");
    for(var i=0; i<sentencesArray.length; i++){
        sentencesArray[i]=sentencesArray[i].trim();
        if(sentencesArray[i]===""){
            sentencesArray.splice(i, 1);
            i--;
        }
    }
    return (
        <>
            <div className="container" style={{color: props.mode==="light"?"black":"white"}}>
                <h1 className="mb-4">{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} placeholder="Enter your text here" onChange={handleOnChange} id="myBox" rows="8" style={{backgroundColor: props.mode==="dark"?"#212529":"white", color:props.mode==="light"?"#212529":"white"}}></textarea>
                </div>
                <button disabled={tempText.length===0} className="btn btn-primary mx-1 my-1" onClick={handleOnUpperClick}>Convert to UPPER CASE</button>
                <button disabled={tempText.length===0} className="btn btn-primary mx-1 my-1" onClick={handleOnLowerClick}>Convert to lower case</button>
                <button disabled={tempText.length===0} className="btn btn-primary mx-1 my-1" onClick={handleOnAlternatingClick}>Convert to aLtErNaTiNg cAsE</button>
                <button disabled={tempText.length===0} className="btn btn-primary mx-1 my-1" onClick={handleOnSentenceClick}>Convert to Sentence case.</button>
                <button disabled={tempText.length===0} className="btn btn-primary mx-1 my-1" onClick={handleOnCopyClick}>Copy</button>
                <button disabled={tempText.length===0} className="btn btn-primary mx-1 my-1" onClick={handleOnClearClick}>Clear</button>
            </div>
            <div className="container my-3" style={{color: props.mode==="light"?"black":"white"}}>
                <h2>Your text summary</h2>
                <p><strong>{wordsArray.length}</strong> words and <strong>{tempText.length}</strong> characters</p>
                <p><strong>{sentencesArray.length}</strong> sentences</p>
                <p><strong>{Math.round(0.008 * wordsArray.length)}</strong> minutes read</p>
                <h2>Preview</h2>
                <p>{tempText.length>0?text:"Nothing to preview!"}</p>
            </div>
        </>
  )
}
