import express from "express";

const router = express.Router();

let allPost = [];

router.post("/post", (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send("Title is required");
  }
  if (!req.body.desc) {
    return res.status(400).send("Description is required");
  }

  const newPost = {
    title: req.body.title,
    desc: req.body.desc,
    id: new Date().getTime(),
  };
  allPost.push(newPost);
  res.send({
    message: "Post Created Successfully",
  });
});

router.get("/post", (req, res, next) => {
  res.send({
    allPost,
  });
});

router.get("/post/:post_id", (req, res, next) => {
  if (!post_id) {
    return res.status(404).send({
      message: "Please enter Post Id",
    });
  }
  const post_id = req.params.post_id;
  const post = allPost.find((p) => {
    return p.id == post_id;
  });
  res.send({
    data: { post },
  });
});

router.put("/post/:post_id", (req, res, next) => {
  const post_id = req.params.post_id;

  if (!req.body.title) {
    return res.status(400).send("Title is required");
  }
  if (!req.body.desc) {
    return res.status(400).send("Description is required");
  }

  if (!post_id) {
    return res.status(400).send({
      message: "Please enter Post Id",
    });
  }

  const post = allPost.find((e) => {
    return e.id == post_id;
  });

  if (!post) {
    return res.status(404).send({
      message: "Post not found",
    });
  }

  const new_post = allPost.map((e) => {
    return e.id == post_id
      ? {
          title: req.body.title,
          desc: req.body.desc,
          id: e.id,
        }
      : e;
  });
  allPost = new_post;

  return res.send({
    message: "Post Updated Successfully",
  });
});

router.delete("/post/:post_id", (req, res, next) => {
  const post_id = req.params.post_id;
  if (!post_id) {
    return res.status(400).send({
      message: "Please enter Post ID ",
    });
  }

  const post = allPost.find((e) => {
    return e.id == post_id;
  });

  if (!post) {
    return res.status(404).send({
      message: "post not found",
    });
  }

  const new_post = allPost.filter((e) => {
    return e.id != post_id;
  });
  allPost = new_post;
  return res.send({
    message: "Post deleted Successfully",
  });
});

export default router;
