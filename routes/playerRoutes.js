const router = require("express").Router();
const passport = require("passport");
const Player = require("../models/PlayerModel");
const Game = require("../models/GamesModel");

router.post("/isNameAvailable", async (req, res) => {
  const { username } = req.body;

  // find player by id
  Player.findOne({ username: username }).then((player) => {
    if (player) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

router.post("/finishSetup", async (req, res) => {
  const { id, name, data, setupInfo } = req.body;

  // find player by id
  Player.findOne({ _id: id })
    .then((player) => {
      player.age = setupInfo.age;
      player.avatar = setupInfo.avatar;
      player.games[name] = data;
      player.setup = true;
      player.markModified("games");

      console.log(player);

      player.save().then((player) => {
        res.status(201).json("success");
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/getplayer", async (req, res) => {
  const { email } = req.body;

  // find player by id
  Player.findOne({ email: email }).then((player) => {
    res.status(201).json({
      player: player,
    });
  });

  // change setup === true
});

module.exports = router;