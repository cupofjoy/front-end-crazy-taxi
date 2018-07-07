
document.addEventListener("DOMContentLoaded", function(event){
  const containerDiv = document.getElementById('container')
  const highScoreChart = document.getElementById("highScoreChart")
  const highScoreHeading = document.createElement("H3")
  highScoreHeading.id = "high-score-heading"
  highScoreHeading.style = "color:midnightblue"
  const submitInput = document.getElementById("submit-input")
  const playerOption = document.getElementById('option-select')
  const playButton = document.getElementById('play-button')
  const highScore = document.getElementById('high-score-button')
  const carTrack = document.getElementById('track')
  const leftTree = document.getElementById('left-tree')
  const leftTree2 = document.getElementById('another-left-tree')
  const theShrub = document.getElementById('shrub1')
  const theShrub2 = document.getElementById('shrub2')
  const rightTree = document.getElementById('right-tree')
  const userCar = document.getElementById('user-car')
  const exitSign = document.getElementById('exit-sign')
  const roadMarking0 = document.getElementById('road-marking 0')
  const roadMarking1 = document.getElementById('road-marking 1')
  const roadMarking2 = document.getElementById('road-marking 2')
  const roadMarking3 = document.getElementById('road-marking 3')
  // const roadMarking4 = document.getElementById('road-marking 4')
  const obstacleCar1 = document.getElementById("obstacle-car-1")
  const obstacleCar2 = document.getElementById("obstacle-car-2")
  const obstacleCar3 = document.getElementById("obstacle-car-3")
  const obstacleCar4 = document.getElementById("obstacle-car-4")
  const leftDiv = document.getElementById("one")
  const roadDiv = document.getElementById("two")
  const rightDiv = document.getElementById("three")
  const gameover = document.createElement("h1")
  const userForm = document.getElementById("user-form")
  const userInput = document.getElementById("user-input")
  gameover.innerText = "GAME OVER"
  gameover.style= "color: red; position:absolute; z-index:0; left:60px; top:200px"
  const counter = document.createElement("h1")
  counter.style= "color:blue; position:absolute; left: 40px; border: 2px solid; padding:1px"
  const finalScore = document.createElement("h1")
  finalScore.style= "color: black; position:absolute; z-index:0; left:80px; top:250px"
  const newRecordText = document.createElement("span")
  newRecordText.style= "color: cyan; position:absolute; z-index:0; left:65px; top:320px"
  const gameBackgroundMusic = document.createElement("audio")
  gameBackgroundMusic.volume = .3
  gameBackgroundMusic.src = "./assets/backgroundMusic.mp3"
  gameBackgroundMusic.setAttribute("preload", "auto");
  gameBackgroundMusic.setAttribute("controls", "none");
  gameBackgroundMusic.style.display = "none";
  const explosionSound = document.createElement("audio")
  explosionSound.src = "./assets/explosionSound.mp3"
  explosionSound.setAttribute("preload", "auto");
  explosionSound.setAttribute("controls", "none");
  explosionSound.style.display = "none";
  const carStart = document.createElement("audio")
  carStart.src = "./assets/carStart.mp3"
  carStart.setAttribute("preload", "auto");
  carStart.setAttribute("controls", "none");
  carStart.style.display = "none";
  const buttonSound = document.createElement("audio")
  buttonSound.volume = .3
  buttonSound.src = "./assets/buttonSound.mp3"
  buttonSound.setAttribute("preload", "auto");
  buttonSound.setAttribute("controls", "none");
  buttonSound.style.display = "none";
  const currentUser = document.createElement("P")
  const PBJBrian = document.createElement("IMG")
  PBJBrian.style="position:absolute; height:auto; left: 190px; max-width:30%; top:100px; z-index:0"
  PBJBrian.src = "https://static.gamespot.com/uploads/scale_super/1179/11799911/2454148-brianpbj.gif"
  const mikeWazowski = document.createElement("IMG")
  mikeWazowski.style="position:absolute; height:auto; left: 200px; max-width:30%; top:100px; z-index:0"
  mikeWazowski.src = "https://i.imgur.com/OGeV1rZ.gif"
  const spongeBob = document.createElement("IMG")
  spongeBob.style="position:absolute; height:auto; left: 200px; max-width:30%; top:100px; z-index:0"
  spongeBob.src = "https://vignette.wikia.nocookie.net/spongebob/images/d/d9/DooyDoo.gif/revision/latest?cb=20141223180449"


  playButton.disabled = true;
  userForm.addEventListener("submit", function (event) {
    event.preventDefault()
    playButton.disabled = false;
    submitInput.disabled = "disabled"


    const body = {username: userInput.value}

    let config =  {
      method:'POST',
      headers:{
          'Content-type':'application/json',
          'Data-type':'application/json'
              },
      body:JSON.stringify(body)
    }

    fetch("http://localhost:3000/api/v1/users", config)

    fetch("http://localhost:3000/api/v1/users").then(r=>r.json()).then(findUserId).then(makeRequest)

    function makeRequest(userObj) {
      fetch("http://localhost:3000/api/v1/games").then(r=>r.json()).then(findUserHighScore)
      function findUserHighScore(gameObjs) {
        if (userObj !== undefined){
        const foundUserObjs = gameObjs.filter(e => e.user_id === userObj.id)
        const sortedUserScores = foundUserObjs.sort(function(obj1, obj2) {return obj2.score-obj1.score})
        currentUser.innerHTML = `<strong>Current User: ${userInput.value}<p id="${userInput.value}-score"> User High Score: ${sortedUserScores[0].score}</p></strong>`
        currentUser.id = `${userInput.value}`
        currentUser.style = "position:absolute; top: 200px; left: 40px; color: midnightblue; border-style:solid;padding: 5px;"
        leftDiv.prepend(currentUser)
        }
        else {
          currentUser.innerHTML = `<strong>Current User: ${userInput.value}</strong>`
          currentUser.style = "position:absolute; top: 200px; left: 40px; color: midnightblue; border-style:solid;padding: 5px;"
          currentUser.id = `${userInput.value}`
          leftDiv.prepend(currentUser)
        }
      }
    }

    function findUserId(userObjs){
      return userId = userObjs.find(e => e.username === userInput.value)

    }

  }) // end of userForm event listener



// HIGH SCORE EVENT LISTENER STARTS HERE
  highScore.addEventListener("click", function(event){

    if (highScoreHeading.innerHTML === ""){




    buttonSound.play()
    fetch("http://localhost:3000/api/v1/games").then(r=>r.json()).then(findHighScores)

    function findHighScores(gameObjs){

      const sortedObjs = gameObjs.sort(function(gameObj1, gameObj2) {return gameObj2.score-gameObj1.score})
      const top5Objs = sortedObjs.slice(0,5)

      highScoreChart.style="border-style: solid; padding-left: 20px; padding-right: 20px; "
      highScoreHeading.innerText = "High Scores:"
      highScoreChart.appendChild(highScoreHeading)

      for (i=0; i < top5Objs.length; i++){
        const topScoreHTML = `<p style="text-align:center; color:magenta" id="li-${i+1}"> ${top5Objs[i].username}: ${top5Objs[i].score}</p>`
        highScoreChart.innerHTML += topScoreHTML

      }// end of for loop



    } // end of findHighScores function

  } //end of if statement
  }) //end of highScore event listener


// THE ENTIRE GAME  STARTS HERE
  playButton.addEventListener("click", function moveDown() {
    newRecordText.innerText = ""
    mikeWazowski.remove()
    spongeBob.remove()
    PBJBrian.remove()
    buttonSound.play()
    document.body.appendChild(gameBackgroundMusic)
    carStart.play()
    setTimeout(function startBG(){gameBackgroundMusic.play()}, 1500)
    userCar.src="http://www.clker.com/cliparts/X/z/O/k/S/k/orange-car-top-view-hi.png"
    userCar.style.left = 95 + "px"
    gameover.remove()
    finalScore.remove()

    function getUserIds(userObjs){
      const userObj = userObjs.find(e => e.username === userInput.value)
      return userObj.id
    }



    playButton.disabled = true;


    userForm.remove()
    leftDiv.appendChild(counter)
    counter.innerText = 0

    let b = -100
    let h = -100
    let i = 150
    let j = 400
    let k = 0
    let l = 200
    let m = 400
    let n = 430
    let o = -200
    let p = 0
    let q = -400
    let r = -800
    let s = -1200
    let t = 360
    let u = 450
    let v = 0
    let w = -100
    let sb = -100
  function step() {
    counter.innerText = parseInt(counter.innerText) + 3
    const obstaclePaths = [-12, 98, 208]
    var rand1 = obstaclePaths[Math.floor(Math.random() * obstaclePaths.length)];
    var rand2 = obstaclePaths[Math.floor(Math.random() * obstaclePaths.length)];
    var rand3 = obstaclePaths[Math.floor(Math.random() * obstaclePaths.length)];
    var rand4 = obstaclePaths[Math.floor(Math.random() * obstaclePaths.length)];

    var backgroundIncrementValue, obstacleIncrementValue;

    if (counter.innerText < 1500){
      var backgroundIncrementValue = 4
      var obstacleIncrementValue = 2
    }
    else if (counter.innerText >= 1500 && counter.innerText < 3000){
      var backgroundIncrementValue = 6
      var obstacleIncrementValue = 3
    }
    else if (counter.innerText >= 3000 && counter.innerText < 4500){
      var backgroundIncrementValue = 8
      var obstacleIncrementValue = 4
    }
    else if (counter.innerText >= 4500 && counter.innerText < 6000){
      var backgroundIncrementValue = 10
      var obstacleIncrementValue = 5
      mikeWazowski.style.top = w + "px"
      rightDiv.appendChild(mikeWazowski)
      w += 5
    }
    else if (counter.innerText >= 6000 && counter.innerText < 7500){
      var backgroundIncrementValue = 12
      var obstacleIncrementValue = 6
    }
    else if (counter.innerText >= 7500 && counter.innerText < 9000){
      var backgroundIncrementValue = 14
      var obstacleIncrementValue = 7
      spongeBob.style.top = sb + "px"
      rightDiv.appendChild(spongeBob)
      sb += 7
    }
    else if (counter.innerText >= 9000 && counter.innerText < 10500){
      var backgroundIncrementValue = 16
      var obstacleIncrementValue = 8
    }
    else if (counter.innerText >= 10500 && counter.innerText < 12000){
      var backgroundIncrementValue = 18
      var obstacleIncrementValue = 9
      PBJBrian.style.top = b + "px"
      rightDiv.appendChild(PBJBrian)
      b += 9
    }
    else if (counter.innerText >= 12000 && counter.innerText < 13500){
      var backgroundIncrementValue = 20
      var obstacleIncrementValue = 10
    }
    else if (counter.innerText >= 13500){
      var backgroundIncrementValue = 22
      var obstacleIncrementValue = 11
    }



     obstacleCar1.style.top = p + "px"
     obstacleCar2.style.top = q + "px"
     obstacleCar3.style.top = r + "px"
     obstacleCar4.style.top = s + "px"
     roadMarking0.style.top = o + "px";
     roadMarking1.style.top = k + "px";
     roadMarking2.style.top = l + "px";
     roadMarking3.style.top = m + "px";
     leftTree.style.top = i + "px";
     leftTree2.style.top = u + "px";
     theShrub.style.top = t + "px";
     theShrub2.style.top = v + "px";
     exitSign.style.top = h + "px";
     rightTree.style.top = j + "px";
     h+= backgroundIncrementValue
     i+= backgroundIncrementValue
     j+= backgroundIncrementValue
     k+= backgroundIncrementValue
     l+= backgroundIncrementValue
     m+= backgroundIncrementValue
     n+= backgroundIncrementValue
     o+= backgroundIncrementValue
     t+= backgroundIncrementValue
     u+= backgroundIncrementValue
     v+= backgroundIncrementValue
     p+= obstacleIncrementValue
     q+= obstacleIncrementValue
     r+= obstacleIncrementValue
     s+= obstacleIncrementValue


     var userCarTop = parseInt(userCar.style.top)
     var obstacleCar1Top = parseInt(obstacleCar1.style.top)
     var obstacleCar2Top = parseInt(obstacleCar2.style.top)
     var obstacleCar3Top = parseInt(obstacleCar3.style.top)
     var obstacleCar4Top = parseInt(obstacleCar4.style.top)
     var userCarLeft = parseInt(userCar.style.left)
     var obstacleCar1Left = parseInt(obstacleCar1.style.left)
     var obstacleCar2Left = parseInt(obstacleCar2.style.left)
     var obstacleCar3Left = parseInt(obstacleCar3.style.left)
     var obstacleCar4Left = parseInt(obstacleCar4.style.left)

     function gameOver(){
     fetch(`http://localhost:3000/api/v1/users`).then(r => r.json()).then(getUserIds).then(postGame)
     playButton.disabled = false
     function postGame(userId){
       const finalScore = parseInt(counter.innerText)
       const body = {username: userInput.value, user_id: userId, score: finalScore}

       let config =  {
         method:'POST',
         headers:{
             'Content-type':'application/json',
             'Data-type':'application/json'
                 },
         body:JSON.stringify(body)
       }

       fetch('http://localhost:3000/api/v1/games', config).then(getUpdatedHighScores)

         function getUpdatedHighScores() {
           if (document.getElementById('high-score-heading')) {
           fetch("http://localhost:3000/api/v1/games").then(r=>r.json()).then(findHighScores)

           function findHighScores(gameObjs){


             const sortedObjs = gameObjs.sort(function(gameObj1, gameObj2) {return gameObj2.score-gameObj1.score})
             const top5Objs = sortedObjs.slice(0,5)

             highScoreChart.style="border-style: solid; padding-left: 20px; padding-right: 20px; "
             highScoreChart.innerHTML = ''
             highScoreHeading.innerText = "High Scores:"
             highScoreChart.appendChild(highScoreHeading)


             for (i=0; i < top5Objs.length; i++){
               const topScoreHTML = `<p style="text-align:center; color:magenta" id="li-${i+1}"> ${top5Objs[i].username}: ${top5Objs[i].score}</p>`
               highScoreChart.innerHTML += topScoreHTML
             }// end of for loop
           }
           }// end of if statement

         } //end of getUpdatedHighScores
      }

    } //end of gameover

     // console.log(obstacleCar1.style.top) // increasing by 1 each step
     // console.log(userCar.style.bottom) // always 50
     if ((userCarTop < (obstacleCar1Top + 120)) && ((userCarTop + 120) > obstacleCar1Top) && ((userCarLeft+3)===obstacleCar1Left)) {
       roadDiv.appendChild(gameover)
       if (document.getElementById(`${userInput.value}-score`)) {
         const userScoreString = document.getElementById(`${userInput.value}-score`)
         const splitTag = userScoreString.innerText.split(":")
         const userScore = parseInt(splitTag[1])

         if (counter.innerText > userScore){
           finalScore.innerHTML = `Score: ${counter.innerText}<br>`
           newRecordText.innerText = "NEW PERSONAL RECORD"
           roadDiv.appendChild(finalScore)
           roadDiv.appendChild(newRecordText)
           userScoreString.innerText = `User High Score: ${counter.innerText}`
        }
        else {
          finalScore.innerHTML = `Score: ${counter.innerText}<br>`
          roadDiv.appendChild(finalScore)
        }
      }
       else {
       finalScore.innerHTML = `Score: ${counter.innerText}<br>`
       roadDiv.appendChild(finalScore)
       currentUser.innerHTML +=
       `<strong><p id="${userInput.value}-score"> User High Score: ${counter.innerText}</p></strong>`
       }
       gameOver();
       userCar.src = `./assets/explosion.gif`
       function removeCar(){
         setTimeout(function(){userCar.src="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png"}, 1200)
       }
       removeCar();
       submitInput.disabled = false
       gameBackgroundMusic.pause()
       gameBackgroundMusic.currentTime = 0
       explosionSound.play()
       leftDiv.appendChild(userForm)


       return;

     }
     if ((userCarTop < (obstacleCar2Top + 110)) && ((userCarTop + 110) > obstacleCar2Top) && ((userCarLeft+3)===obstacleCar2Left)) {
       roadDiv.appendChild(gameover)
       if (document.getElementById(`${userInput.value}-score`)) {
         const userScoreString = document.getElementById(`${userInput.value}-score`)
         const splitTag = userScoreString.innerText.split(":")
         const userScore = parseInt(splitTag[1])

         if (counter.innerText > userScore){
           finalScore.innerHTML = `Score: ${counter.innerText}<br>`
           newRecordText.innerText = "NEW PERSONAL RECORD"
           roadDiv.appendChild(finalScore)
           roadDiv.appendChild(newRecordText)
           userScoreString.innerText = `User High Score: ${counter.innerText}`
        }
        else {
          finalScore.innerHTML = `Score: ${counter.innerText}<br>`
          roadDiv.appendChild(finalScore)
        }
      }
       else {
       finalScore.innerHTML = `Score: ${counter.innerText}<br>`
       roadDiv.appendChild(finalScore)
       currentUser.innerHTML +=
       `<strong><p id="${userInput.value}-score"> User High Score: ${counter.innerText}</p></strong>`
       }
       gameOver();
       userCar.src = `./assets/explosion.gif`
       function removeCar(){
         setTimeout(function(){userCar.src="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png"}, 1200)
       }
       removeCar();
       submitInput.disabled = false
       gameBackgroundMusic.pause()
       gameBackgroundMusic.currentTime = 0
       explosionSound.play()
       leftDiv.appendChild(userForm)

       return;

     }
     if ((userCarTop < (obstacleCar3Top + 110)) && ((userCarTop + 110) > obstacleCar3Top) && ((userCarLeft+3)===obstacleCar3Left)) {
       roadDiv.appendChild(gameover)
       if (document.getElementById(`${userInput.value}-score`)) {
         const userScoreString = document.getElementById(`${userInput.value}-score`)
         const splitTag = userScoreString.innerText.split(":")
         const userScore = parseInt(splitTag[1])

         if (counter.innerText > userScore){
           finalScore.innerHTML = `Score: ${counter.innerText}<br>`
           newRecordText.innerText = "NEW PERSONAL RECORD"
           roadDiv.appendChild(finalScore)
           roadDiv.appendChild(newRecordText)
           userScoreString.innerText = `User High Score: ${counter.innerText}`
        }
        else {
          finalScore.innerHTML = `Score: ${counter.innerText}<br>`
          roadDiv.appendChild(finalScore)
        }
      }
       else {
       finalScore.innerHTML = `Score: ${counter.innerText}<br>`
       roadDiv.appendChild(finalScore)
       currentUser.innerHTML +=
       `<strong><p id="${userInput.value}-score"> User High Score: ${counter.innerText}</p></strong>`
       }
       gameOver();
       userCar.src = `./assets/explosion.gif`
       function removeCar(){
         setTimeout(function(){userCar.src="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png"}, 1200)
       }
       removeCar();
       submitInput.disabled = false
       gameBackgroundMusic.pause()
       gameBackgroundMusic.currentTime = 0
       explosionSound.play()
       leftDiv.appendChild(userForm)

       return;

     }
     if ((userCarTop < (obstacleCar4Top + 110)) && ((userCarTop + 110) > obstacleCar4Top) && ((userCarLeft+3)===obstacleCar4Left)) {
       roadDiv.appendChild(gameover)
       if (document.getElementById(`${userInput.value}-score`)) {
         const userScoreString = document.getElementById(`${userInput.value}-score`)
         const splitTag = userScoreString.innerText.split(":")
         const userScore = parseInt(splitTag[1])

         if (counter.innerText > userScore){
           finalScore.innerHTML = `Score: ${counter.innerText}<br>`
           newRecordText.innerText = "NEW PERSONAL RECORD"
           roadDiv.appendChild(finalScore)
           roadDiv.appendChild(newRecordText)
           userScoreString.innerText = `User High Score: ${counter.innerText}`
        }
        else {
          finalScore.innerHTML = `Score: ${counter.innerText}<br>`
          roadDiv.appendChild(finalScore)
        }
      }
       else {
       finalScore.innerHTML = `Score: ${counter.innerText}<br>`
       roadDiv.appendChild(finalScore)
       currentUser.innerHTML +=
       `<strong><p id="${userInput.value}-score"> User High Score: ${counter.innerText}</p></strong>`
       }
       gameOver();
       userCar.src = `./assets/explosion.gif`
       function removeCar(){
         setTimeout(function(){userCar.src="https://raw.githubusercontent.com/diegocsandrim/sharp-test/master/output1.png"}, 1200)
       }
       removeCar();
       submitInput.disabled = false
       gameBackgroundMusic.pause()
       gameBackgroundMusic.currentTime = 0
       explosionSound.play()
       leftDiv.appendChild(userForm)

       return;


     }

     if (obstacleCar1Top >= 800 ){
       obstacleCar1.style.left = rand1+ "px"
       p = -400
     }
     if (obstacleCar2Top >= 800){
       obstacleCar2.style.left = rand2+ "px"
       q = -400
     }
     if (obstacleCar3Top >= 800){
       obstacleCar3.style.left = rand3+ "px"
       r = -400
     }
     if (obstacleCar4Top >= 800 ){
       obstacleCar4.style.left = rand4+ "px"
       s = -400
     }

     if (parseInt(exitSign.style.top) >= 2400){
       h = -1600
     }
     if (parseInt(leftTree.style.top) >= 600){
       i = -100
     }
     if (parseInt(leftTree2.style.top) >= 600){
       u = -100
     }
     if (parseInt(theShrub.style.top) >= 600){
       t = -100
     }
     if (parseInt(theShrub2.style.top) >= 600){
       v = -100
     }
     if (parseInt(rightTree.style.top) >= 600){
       j = -400
     }
     if (parseInt(roadMarking0.style.top) >= 600){
       o = -200
     }
     if (parseInt(roadMarking1.style.top) >= 600){
       k = -200
     }
     if (parseInt(roadMarking2.style.top) >= 600){
       l = -200
     }
     if (parseInt(roadMarking3.style.top) >= 600){
       m = -200
     }
     // if (parseInt(roadMarking4.style.top) >= 600){
     //   n = -150
     // }
     setTimeout(step, 10)
  }
  step();

  window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([ 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
  }, false);
})  // end of playButton Event Listener

  window.addEventListener("keydown", function(event){
    u = parseInt(userCar.style.left)
    if (event.keyCode === 37){
      if (u === 95){
        userCar.style.left = -15 + "px"
      }
      else if (u === -15){
        console.log("nope!")
      }
      else if (u === 205){
        userCar.style.left = 95 + "px"
      }
    }
    else if (event.keyCode === 39){
      if  (u === -15){
        userCar.style.left = 95 + "px"

      }
      else if (u === 95){
        userCar.style.left = 205 + "px"
      }
      else if (u === 205){
        console.log("nope!")
      }
    }
  })    // end of event listener for user left/right keys


}) // end of DOM Content Loaded
