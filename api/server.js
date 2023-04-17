// SUNUCUYU BU DOSYAYA KURUN
const express = require('express');

const Model = require("./users/model");

const server= express();

server.use(express.json());

server.get('/' , (req,res)=>{
    res.send("çalişiyor!")

})

server.post("/api/users", (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
      res.status(400);
      res.json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      Model.insert(newUser)
        .then((newUser) => {
          res.status(201).json(newUser);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
        });
    }
  });

  server.get("/api/users", (req, res) => {
    Model.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
      });
  });


  server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    Model.findById(id)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
      });
  });

  server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    Model.remove(id)
      .then((removedUser) => {
        if (!removedUser) {
          res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
        } else {
          res.status(200).json(removedUser);
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Kullanıcı silinemedi" });
      });
  });

 


server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    if (!updatedUser.name || !updatedUser.bio) {
      res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
    } else {
      Model.update(id, updatedUser).then((update) => {
        if (!update) {
          res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
        } else {
          res.status(200).json(update);
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
      });
     
    }
    
  });


module.exports = server; // SERVERINIZI EXPORT EDİN {}
