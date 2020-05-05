(function () {
  var currentPlayer = "player1";
  var alert = $("#alert");
  var background = $(".background");
  var playingCoin = $("#playingCoin");
  var columns = $(".column");
  var numbers = ["one", "two", "three", "four", "five", "six", "seven"];
  var friend = $("#friend");
  var AI = $("#AI");
  let fullColumns = [];
  var mode;

  var box = $("#askForPlayers");
  console.log("box", box);

  friend.on("click", function (e) {
    mode = "friend";
    box.css("visibility", "hidden");
  });

  AI.on("click", function (e) {
    mode = "AI";
    box.css("visibility", "hidden");
  });

  $(".column").on("click", function (e) {
    if (e.target === background) {
      return;
    } else {
      if (mode === "friend" || currentPlayer === "player1") {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
      }
      for (var i = slotsInCol.length - 1; i >= 0; i--) {
        if (
          !slotsInCol.eq(i).hasClass("player1") &&
          !slotsInCol.eq(i).hasClass("player2")
        ) {
          slotsInCol.eq(i).addClass(currentPlayer);
          break;
        }
      }
      if (i === -1) {
        console.log("i", i);
        return;
      }
      checkForVictory(slotsInCol);
      var slotsInRow = $(".row" + i);
      checkForVictory(slotsInRow);

      var diagonal = [];
      var diagonal2 = [];
      var diagonal3 = [];
      var diagonal4 = [];
      var diagonal5 = [];
      var diagonal6 = [];
      var diagonal7 = [];
      var diagonal8 = [];
      var diagonal9 = [];
      var diagonal10 = [];
      var diagonal11 = [];
      var diagonal12 = [];

      for (var x = 0; x < slotsInRow.length; x++) {
        for (var y = 0; y < slotsInCol.length; y++) {
          if (x + y == 5) {
            diagonal.push(getSlotByCoord(x, y));
          } else if (x + y == 6) {
            diagonal2.push(getSlotByCoord(x, y));
          } else if (x + y == 7) {
            diagonal3.push(getSlotByCoord(x, y));
          } else if (x + y == 8) {
            diagonal4.push(getSlotByCoord(x, y));
          } else if (x + y == 4) {
            diagonal5.push(getSlotByCoord(x, y));
          } else if (x + y == 3) {
            diagonal6.push(getSlotByCoord(x, y));
          }
          if (x - y == 3) {
            diagonal7.push(getSlotByCoord(x, y));
          } else if (x - y == 2) {
            diagonal8.push(getSlotByCoord(x, y));
          } else if (x - y == 1) {
            diagonal9.push(getSlotByCoord(x, y));
          } else if (x - y == 0) {
            diagonal10.push(getSlotByCoord(x, y));
          } else if (x - y == -1) {
            diagonal11.push(getSlotByCoord(x, y));
          } else if (x - y == -2) {
            diagonal12.push(getSlotByCoord(x, y));
          }
        }
      }
      var bigArray = [
        diagonal,
        diagonal2,
        diagonal3,
        diagonal4,
        diagonal5,
        diagonal6,
        diagonal7,
        diagonal8,
        diagonal9,
        diagonal10,
        diagonal11,
        diagonal12,
      ];

      function checkForDiagVictory() {
        for (var z = 0; z < bigArray.length; z++) {
          var counter = 0;
          for (var q = 0; q < bigArray[z].length; q++) {
            if (bigArray[z][q].hasClass(currentPlayer)) {
              counter++;
            } else {
              counter = 0;
            }
            if (counter == 4) {
              alert.html("the winner player is: " + currentPlayer);
              bigArray[z][q].addClass("big");
              bigArray[z][q - 1].addClass("big");
              bigArray[z][q - 2].addClass("big");
              bigArray[z][q - 3].addClass("big");
              alert.show();
              alert.addClass("victory");
              background.css("visibility", "visible");
            }
          }
        }
      }
      checkForDiagVictory();
      switchPlayer();
    }
  });

  $(window).on("mousemove", function (e) {
    var mousePosX = e.clientX;
    playingCoin.css("left", mousePosX);
  });

  function checkForVictory(slots) {
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
      if (slots.eq(i).hasClass(currentPlayer)) {
        count++;
      } else {
        count = 0;
      }
      if (count == 4) {
        slots.eq(i).addClass("big");
        slots.eq(i - 1).addClass("big");
        slots.eq(i - 2).addClass("big");
        slots.eq(i - 3).addClass("big");
        console.log("victory");
        alert.show();
        alert.addClass("victory");
        alert.html("the winner player is: " + currentPlayer);
        background.css("visibility", "visible");
        setTimeout(function () {
          alert.toggleClass("victory");
        }, 2000);
        return count == 4;
      }
    }
  }

  function switchPlayer() {
    var moveScore = 0;
    var bestMoveSoFar = 0;
    function moveForColumns(slots) {
      if (slots.eq(y).hasClass("player1")) {
        count++;
      } else {
        if (count > highestCount && count > 1) {
          highestCount = count;
          if (highestCount == 2) {
            moveScore = 4;
          }
          if (highestCount == 3) {
            moveScore = 8;
          }
          if (!slots.eq(y).hasClass("player2")) {
            if (moveScore > bestMoveSoFar) {
              bestMoveSoFar = moveScore;
              nextMove = x;
            }
          }
        }
        count = 0;
      }
    }

    if (currentPlayer === "player1") {
      currentPlayer = "player2";
      playingCoin.css("background-color", "yellow");
      if (mode === "AI") {
        var count = 0;
        var slots;
        var column;
        var nextMove;
        var highestCount = 0;
        //locic for moves in columns
        var randomSide = Math.floor(Math.random() * 2);
        if (randomSide === 0) {
          for (var x = 0; x < numbers.length; x++) {
            column = $(".column." + numbers[x]);
            slots = column.children();
            for (var y = slots.length - 1; y >= 0; y--) {
              moveForColumns(slots);
            }
          }
        } else {
          for (var x = numbers.length - 1; x >= 0; x--) {
            column = $(".column." + numbers[x]);
            slots = column.children();
            for (var y = slots.length - 1; y >= 0; y--) {
              moveForColumns(slots);
            }
          }
        }
        for (var x = 0; x < numbers.length; x++) {
          column = $(".column." + numbers[x]);
          slots = column.children();
          for (var y = slots.length - 1; y >= 0; y--) {
            if (slots.eq(y).hasClass("player2")) {
              count++;
            } else {
              count = 0;
            }
            if (count === 2) {
              moveScore = 2;
              if (moveScore > bestMoveSoFar) {
                nextMove = x;
              }
            }
            if (count === 3) {
              moveScore = 10;
              if (moveScore > bestMoveSoFar) {
                nextMove = x;
              }
            }
          }
        }
        // logic for moves in rows
        for (let y = 0; y < 6; y++) {
          let counter = 0;
          var rows = $(".row" + y);
          for (var x = 0; x < 7; x++) {
            if (rows.eq(x).hasClass("player1")) {
              if (x <= 3) {
                counter++;
                console.log("counter", counter);
              } else {
                if (!rows.eq(x - 4).hasClass("player1")) {
                  counter++;
                }
              }
              console.log("counter outside else", counter);
              if (counter === 3) {
                let rowUnder = $(`.row${y + 1}`);
                console.log("rowUnder", rowUnder);
                console.log("counter 3", x);
                if (
                  !rows.eq(x + 1).hasClass("player1") &&
                  !rows.eq(x + 1).hasClass("player2") &&
                  !rowUnder.eq(x + 1).hasClass("player1") &&
                  !rowUnder.eq(x + 1).hasClass("player1")
                ) {
                  console.log("in x + 1", moveScore, x, y);
                  moveScore = 9;
                  if (moveScore > bestMoveSoFar) {
                    nextMove = x + 1;
                  }
                }
                if (
                  !rows.eq(x - 1).hasClass("player1") &&
                  !rows.eq(x - 1).hasClass("player2") &&
                  !rowUnder.eq(x - 1).hasClass("player1") &&
                  !rowUnder.eq(x - 1).hasClass("player1")
                ) {
                  console.log("in x - 1", moveScore, x, y);
                  moveScore = 9;
                  if (moveScore > bestMoveSoFar) {
                    nextMove = x - 1;
                  }
                }
                if (
                  !rows.eq(x - 2).hasClass("player1") &&
                  !rows.eq(x - 2).hasClass("player2") &&
                  !rowUnder.eq(x - 2).hasClass("player1") &&
                  !rowUnder.eq(x - 2).hasClass("player1")
                ) {
                  console.log("in x - 2", moveScore, x, y);
                  moveScore = 9;
                  if (moveScore > bestMoveSoFar) {
                    nextMove = x - 2;
                  }
                }
                if (
                  !rows.eq(x - 3).hasClass("player1") &&
                  !rows.eq(x - 3).hasClass("player2") &&
                  !rowUnder.eq(x - 3).hasClass("player1") &&
                  !rowUnder.eq(x - 3).hasClass("player1")
                ) {
                  console.log("in x - 3", moveScore, x, y);
                  moveScore = 9;
                  if (moveScore > bestMoveSoFar && x >= 3) {
                    nextMove = x - 3;
                  }
                }
              }
            }
          }
        }

        console.log("nextMove", nextMove);
        if (!nextMove && nextMove != 0) {
          var random = Math.floor(Math.random() * 7);
          column = numbers[random];
        } else {
          column = numbers[nextMove];
          console.log("column", column);
        }
        var col = $(`.${column}`);

        var slotsInCol = col.children();
        if (slotsInCol.eq(0).hasClass("player1" || "player2")) {
          console.log("slotsInCol.eq(0)", slotsInCol.eq(0));
          currentPlayer = "player1";
          switchPlayer();
          return;
        }
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
          if (
            !slotsInCol.eq(i).hasClass("player1") &&
            !slotsInCol.eq(i).hasClass("player2")
          ) {
            slotsInCol.eq(i).addClass(currentPlayer);
            break;
          }
        }
        checkForVictory(slotsInCol);
        var slotsInRow = $(".row" + i);
        checkForVictory(slotsInRow);

        playingCoin.css("background-color", "red");
        currentPlayer = "player1";
      }
    } else {
      currentPlayer = "player1";
      playingCoin.css("background-color", "red");
    }
  }

  $("#clear").on("click", function () {
    function clear() {
      background.css("visibility", "hidden");
      alert.hide();
      $("#board").toggleClass("again");
      setTimeout(function () {
        $("#board").toggleClass("again");
      }, 3000);
      setTimeout(function () {
        var divs = $("div");
        for (var i = 0; i < divs.length; i++) {
          divs.eq(i).removeClass("player1 player2 big");
        }
      }, 500);
    }
    clear();
  });

  function getSlotByCoord(col, row) {
    return $(".column").eq(col).children().eq(row);
  }
})();
