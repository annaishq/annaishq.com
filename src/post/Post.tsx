import hljs from "highlight.js";
import glsl from "highlight.js/lib/languages/glsl";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/night-owl.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/slide.css";
import "./css/typography.css";
import { type Post } from "./posts";

hljs.registerLanguage("glsl", glsl);
hljs.registerLanguage("py", python);

export function Post({ post }: { post: Post }) {
  const navigate = useNavigate();
  const { Component } = post;

  function toPrev() {
    if (post.prev) {
      navigate(post.prev.path);
    }
  }

  function toNext() {
    if (post.next) {
      navigate(post.next.path);
    }
  }
  useEffect(() => {
    hljs.highlightAll();
  });

  useEffect(() => {
    // preload next slide
    if (post.next) {
      post.next.file();
    }
    function press(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        toPrev();
      } else if (e.key === "ArrowRight") {
        toNext();
      }
    }

    document.addEventListener("keydown", press);
    return () => document.removeEventListener("keydown", press);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between text-predator-400 m-4">
        <div className="w-30 flex flex-row justify-start">
          <div
            className={`h-0 w-0 border-y-12 border-y-transparent border-r-12 border-r-predator-200
          cursor-pointer
           ${post.page === 1 ? "opacity-25" : ""}`}
            onClick={toPrev}
          ></div>
        </div>
        <div className="grow">Anna Ishq</div>
        <div className="flex flex-row w-30 gap-8 justify-end">
          <div className="opacity-40">
            {post.page}/{post.total}
          </div>
          <div
            className={`h-0 w-0 border-y-12 border-y-transparent border-l-12 border-l-predator-200 
          cursor-pointer
          ${post.page === post.total ? "opacity-25" : ""} `}
            onClick={toNext}
          ></div>
        </div>
      </div>
      <div className="slide bg-predator-50 rounded-2xl p-8 text-prey-800 text-left">
        <Component />
      </div>
    </div>
  );
}
