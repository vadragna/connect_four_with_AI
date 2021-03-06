(function () {
  var currentPlayer = "player1";
  var alert = $("#alert");
  var background = $(".background");
  var playingCoin = $("#playingCoin");
  var columns = $(".column");
  var numbers = ["one", "two", "three", "four", "five", "six", "seven"];
  var friend = $("#friend");
  var AI = $("#AI");
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

  for (var x = 0; x < 7; x++) {
    for (var y = 0; y < 6; y++) {
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
  function addCoin(column) {
    for (var i = column.length - 1; i >= 0; i--) {
      if (
        !column.eq(i).hasClass("player1") &&
        !column.eq(i).hasClass("player2")
      ) {
        column.eq(i).addClass(currentPlayer);
        if (i != 0 || column.eq(0).not("player1" || "player2")) {
          return i;
        } else {
          return;
        }
      }
    }
  }

  $(".column").on("click", function (e) {
    if (e.target === background || e.target === alert) {
      return;
    } else {
      if (mode === "friend" || currentPlayer === "player1") {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        var i = addCoin(slotsInCol);
        if (!i) {
          return;
        }
      }

      checkForVictory(slotsInCol);
      var slotsInRow = $(".row" + i);
      checkForVictory(slotsInRow);

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
    // logic for defence column
    function moveForColumns(slots) {
      if (slots.eq(y).hasClass("player1")) {
        count++;
      } else {
        if (count >= highestCount && count > 1) {
          highestCount = count;
          if (highestCount == 3) {
            moveScore = 8;
            if (
              !slots.eq(y).hasClass("player2") &&
              !slots.eq(y).hasClass("player1")
            ) {
              if (moveScore > bestMoveSoFar) {
                console.log("in defence column", y, "y", "slots", slots);
                bestMoveSoFar = moveScore;
                nextMove = x;
              }
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
        var diagCounter = 0;
        var diagCounter2 = 0;
        var slots;
        var column;
        var nextMove;
        var highestCount = 0;

        //logic for moves in columns
        var randomSide = Math.floor(Math.random() * 2);
        // if (randomSide === 0) {
        for (var x = 0; x < numbers.length; x++) {
          column = $(".column." + numbers[x]);
          slots = column.children();
          for (var y = slots.length - 1; y >= 0; y--) {
            moveForColumns(slots);
          }
        }
        // }
        //  else {
        //   for (var x = numbers.length - 1; x >= 0; x--) {
        //     column = $(".column." + numbers[x]);
        //     slots = column.children();
        //     for (var y = slots.length - 1; y >= 0; y--) {
        //       moveForColumns(slots);
        //     }
        //   }
        // }

        //logic for next move columns attack
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
              if (
                y > 0 &&
                !slots.eq(y - 1).hasClass("player2") &&
                !slots.eq(y - 1).hasClass("player1")
              ) {
                moveScore = 4;
                if (moveScore > bestMoveSoFar) {
                  console.log("in attack column 2 pieces", "y", y);
                  bestMoveSoFar = moveScore;
                  nextMove = x;
                }
                console.log("nextMove in attack columns 2 pieces", nextMove);
              } else {
                moveScore = 0;
              }
            }
            if (count === 3) {
              if (
                y > 0 &&
                !slots.eq(y - 1).hasClass("player2") &&
                !slots.eq(y - 1).hasClass("player1")
              ) {
                moveScore = 13;
                if (moveScore > bestMoveSoFar) {
                  bestMoveSoFar = moveScore;
                  nextMove = x;
                  console.log("nextMove in attack columns 3 pieces", nextMove);
                }
              } else {
                moveScore = 0;
              }
            }
          }
        }
        // logic for moves in rows
        for (let y = 5; y >= 0; y--) {
          let counter = 0;
          let count = 0;
          let counting = 0;
          var rows = $(".row" + y);
          for (var x = 0; x < 7; x++) {
            if (rows.eq(x).hasClass("player2")) {
              count++;
            } else {
              count = 0;
            }
            if (count == 3) {
              if (
                !rows.eq(x + 1).hasClass("player2") &&
                !rows.eq(x + 1).hasClass("player1") &&
                x <= 5
              ) {
                moveScore = 12;
                if (moveScore > bestMoveSoFar) {
                  bestMoveSoFar = moveScore;
                  console.log("in attack row +1");
                  nextMove = x + 1;
                }
              }
              if (
                !rows.eq(x - 3).hasClass("player2") &&
                !rows.eq(x - 3).hasClass("player1") &&
                x >= 3
              ) {
                moveScore = 12;
                if (moveScore > bestMoveSoFar) {
                  bestMoveSoFar = moveScore;
                  console.log("in attack row -3");
                  nextMove = x - 3;
                }
              }
            }

            function bottomRowLogic(human, ai) {
              if (
                !rows.eq(x + 1).hasClass(human) &&
                !rows.eq(x + 1).hasClass(ai) &&
                bestMoveSoFar < 8 &&
                x < 6
              ) {
                moveScore = 8;
                console.log("in x + 1", moveScore, "x", x, "y", y);
                if (x < 6) {
                  if (moveScore > bestMoveSoFar) {
                    bestMoveSoFar = moveScore;
                  }
                  nextMove = x + 1;
                  console.log("next move defence rows +1", nextMove);
                }
              }
              if (
                !rows.eq(x - 1).hasClass(human) &&
                !rows.eq(x - 1).hasClass(ai) &&
                bestMoveSoFar <= 8
              ) {
                console.log("in x - 1", moveScore, x, y);
                moveScore = 9;
                bestMoveSoFar = moveScore;
                nextMove = x - 1;
                console.log("next move defence rows -1", nextMove);
              }
              if (
                !rows.eq(x - 2).hasClass(human) &&
                !rows.eq(x - 2).hasClass(ai) &&
                bestMoveSoFar <= 8
              ) {
                console.log("in x - 2", moveScore, x, y);
                moveScore = 9;
                bestMoveSoFar = moveScore;
                nextMove = x - 2;
                console.log("next move defence rows -2", nextMove);
              }
              if (
                !rows.eq(x - 3).hasClass(human) &&
                !rows.eq(x - 3).hasClass(ai) &&
                bestMoveSoFar < 8 &&
                x >= 3
              ) {
                moveScore = 8;
                bestMoveSoFar = moveScore;
                nextMove = x - 3;
                console.log("next move defence rows -3", nextMove);
              }
            }
            function rowLogic(human, ai) {
              if (y < 5) {
                let under = y + 1;
                let rowUnder = $(".row" + under);
                if (
                  !rows.eq(x + 1).hasClass(human) &&
                  !rows.eq(x + 1).hasClass(ai) &&
                  x < 6 &&
                  bestMoveSoFar <= 8 &&
                  (rowUnder.eq(x + 1).hasClass(human) ||
                    rowUnder.eq(x + 1).hasClass(ai))
                ) {
                  console.log("in x + 1", moveScore, "x", x, "y", y);
                  moveScore = 8;
                  if (moveScore > bestMoveSoFar) {
                    bestMoveSoFar = moveScore;
                    nextMove = x + 1;
                    console.log("next move defence rows +1", nextMove);
                  }
                }
                if (
                  !rows.eq(x - 3).hasClass(human) &&
                  !rows.eq(x - 3).hasClass(ai) &&
                  x >= 3 &&
                  bestMoveSoFar <= 8 &&
                  (rowUnder.eq(x - 3).hasClass(human) ||
                    rowUnder.eq(x - 3).hasClass(ai))
                ) {
                  moveScore = 8;
                  console.log("in x - 3", moveScore, x, y);
                  bestMoveSoFar = moveScore;
                  nextMove = x - 3;
                  console.log("next move defence rows -3", nextMove);
                }
                if (
                  !rows.eq(x - 2).hasClass(human) &&
                  !rows.eq(x - 2).hasClass(ai) &&
                  x >= 2 &&
                  bestMoveSoFar <= 8 &&
                  (rowUnder.eq(x - 2).hasClass(human) ||
                    rowUnder.eq(x - 2).hasClass(ai))
                ) {
                  moveScore = 9;
                  console.log("in x - 2", moveScore, x, y);
                  bestMoveSoFar = moveScore;
                  nextMove = x - 2;
                  console.log("next move defence rows -2", nextMove);
                }
                if (
                  !rows.eq(x - 1).hasClass(human) &&
                  !rows.eq(x - 1).hasClass(ai) &&
                  x >= 1 &&
                  bestMoveSoFar <= 8 &&
                  (rowUnder.eq(x - 1).hasClass(human) ||
                    rowUnder.eq(x - 1).hasClass(ai))
                ) {
                  moveScore = 9;
                  console.log("in x - 1", moveScore, x, y);
                  bestMoveSoFar = moveScore;
                  nextMove = x - 1;
                  console.log("next move defence rows -1", nextMove);
                }
              }
            }
            function applyRowLogic(player, opponent) {
              if (rows.eq(x).hasClass(player)) {
                counter++;
                if (x >= 4 && rows.eq(x - 4).hasClass(player)) {
                  counter--;
                }
              }
              if (rows.eq(x).hasClass(opponent)) {
                counter = 0;
              }

              if (counter === 3) {
                if (y === 5) {
                  bottomRowLogic("player1", "player2");
                } else {
                  rowLogic("player1", "player2");
                }
              }
            }
            applyRowLogic("player1", "player2");

            if (rows.eq(x).hasClass("player1")) {
              counting++;
            } else {
              counting = 0;
            }

            if (counting == 2 && y === 5) {
              if (
                !rows.eq(x + 1).hasClass("player1") &&
                !rows.eq(x + 1).hasClass("player2") &&
                x <= 5
              ) {
                moveScore = 4;
                if (moveScore > bestMoveSoFar) {
                  console.log("in defence row +1 2 pieces", "y", y);

                  bestMoveSoFar = moveScore;
                  nextMove = x + 1;
                }
              }
              if (
                !rows.eq(x - 2).hasClass("player1") &&
                !rows.eq(x - 2).hasClass("player2") &&
                x >= 2
              ) {
                moveScore = 3;
                if (moveScore > bestMoveSoFar) {
                  console.log("in defence row -2 2 pieces", "y", y);
                  bestMoveSoFar = moveScore;
                  nextMove = x - 2;
                }
              }
            } else if (counting == 2 && y < 5) {
              let under = y + 1;
              let rowUnder = $(".row" + under);
              if (
                !rows.eq(x + 1).hasClass("player1") &&
                !rows.eq(x + 1).hasClass("player2") &&
                (rowUnder.eq(x + 1).hasClass("player1") ||
                  rowUnder.eq(x + 1).hasClass("player2")) &&
                x <= 5
              ) {
                moveScore = 3;
                if (moveScore > bestMoveSoFar) {
                  console.log("in defence row +1 2 pieces", "y", y);
                  bestMoveSoFar = moveScore;
                  nextMove = x + 1;
                }
              }
              if (
                !rows.eq(x - 2).hasClass("player1") &&
                !rows.eq(x - 2).hasClass("player2") &&
                (rowUnder.eq(x - 2).hasClass("player1") ||
                  rowUnder.eq(x - 2).hasClass("player2")) &&
                x <= 2
              ) {
                moveScore = 4;
                if (moveScore > bestMoveSoFar) {
                  console.log("in defence row -2 2 pieces", "y", y, "x", x);
                  bestMoveSoFar = moveScore;
                  nextMove = x - 2;
                }
              }
            }
            // diagDefanceLogic
          }
          diagLogic("player1", "player2");
          // diagLogic("player2", "player1");
          function diagLogic(player, opponent) {
            for (var z = 0; z < bigArray.length; z++) {
              diagCounter2 = 0;
              diagCounter = 0;
              for (var q = 0; q < bigArray[z].length; q++) {
                if (bigArray[z][q].hasClass(player)) {
                  diagCounter++;
                } else {
                  diagCounter = 0;
                }
                if (diagCounter == 3) {
                  console.log("diagCounter", diagCounter);
                  if (bigArray[z][q + 1]) {
                    let column = getCoords(bigArray[z][q + 1])[0];
                    let row = getCoords(bigArray[z][q + 1])[1];
                    console.log(bigArray[z][q + 1]);
                    if (
                      !getSlotByCoord(column, row).hasClass("player1") &&
                      !getSlotByCoord(column, row).hasClass("player2") &&
                      (getSlotByCoord(column, row + 1).hasClass("player1") ||
                        getSlotByCoord(column, row + 1).hasClass("player2"))
                    ) {
                      moveScore = 10;
                      if (moveScore >= bestMoveSoFar) {
                        console.log("in diag +1", "column", column, "row", row);
                        bestMoveSoFar = moveScore;
                        nextMove = column;
                      }
                    }
                  }
                  if (bigArray[z][q - 3]) {
                    let column = getCoords(bigArray[z][q - 3])[0];
                    let row = getCoords(bigArray[z][q - 3])[1];
                    // console.log(bigArray[z][q - 3]);
                    if (
                      !getSlotByCoord(column, row).hasClass("player1") &&
                      !getSlotByCoord(column, row).hasClass("player2") &&
                      (getSlotByCoord(column, row + 1).hasClass("player1") ||
                        getSlotByCoord(column, row + 1).hasClass("player2"))
                    ) {
                      moveScore = 10;
                      if (moveScore >= bestMoveSoFar) {
                        console.log("in diag - 3");
                        bestMoveSoFar = moveScore;
                        nextMove = column;
                      }
                    }
                  }
                }
                if (bigArray[z][q].hasClass(player)) {
                  diagCounter2++;
                }
                if (q >= 4 && rows.eq(q - 4).hasClass(player)) {
                  diagCounter2--;
                }
                if (bigArray[z][q].hasClass(opponent)) {
                  diagCounter2 = 0;
                }
                if (diagCounter2 === 3) {
                  for (let i = 1; i <= 2; i++) {
                    let column = getCoords(bigArray[z][q - i])[0];
                    let row = getCoords(bigArray[z][q - i])[1];
                    // console.log("bigArray[z][q - i]", bigArray[z][q - i], i);
                    if (
                      !getSlotByCoord(column, row).hasClass("player1") &&
                      !getSlotByCoord(column, row).hasClass("player2") &&
                      (getSlotByCoord(column, row - i).hasClass("player1") ||
                        getSlotByCoord(column, row - i).hasClass("player2"))
                    ) {
                      moveScore = 10;
                      if (moveScore >= bestMoveSoFar) {
                        console.log("in diag -" + i);
                        bestMoveSoFar = moveScore;
                        nextMove = column;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        console.log(
          "nextMove definitive",
          nextMove,
          "bestMoveSoFar",
          bestMoveSoFar,
          "moveScore",
          moveScore
        );
        var col;
        var slotsInCol;
        if (!nextMove && nextMove != 0) {
          function randomMove() {
            var random = Math.floor(Math.random() * 7);
            column = numbers[random];
            col = $(`.column.${column}`);
            console.log("random", column, col);
            var slotsInCol = col.children();
            if (slotsInCol.eq(0).hasClass("player1" || "player2")) {
              console.log("lets random again");
              randomMove();
            }
            return col.children();
          }
          var slotsInCol = randomMove();
        } else {
          column = numbers[nextMove];
          console.log("column", column);
        }
        col = $(`.column.${column}`);
        slotsInCol = col.children();

        var i = addCoin(slotsInCol);

        checkForVictory(slotsInCol);
        var slotsInRow = $(".row" + i);
        checkForVictory(slotsInRow);
        checkForDiagVictory();
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

  function getCoords(el) {
    let parent = el.parent();
    for (let i = 0; i <= 6; i++) {
      if (parent.hasClass(numbers[i])) {
        var column = i;
      }
    }
    for (let i = 0; i <= 5; i++) {
      if (el.hasClass("row" + i)) {
        let row = i;
        return [column, row];
      }
    }
  }
})();
