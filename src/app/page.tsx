"use client";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useRaisedShadow } from "@/utils/useRaisedShadow";
import { ReorderIcon } from "@/components/dragIcon";
import AuthForm from "./auth-form";

export default function Home() {
  const [items, setItems] = useState(posts);
  return (
    <div className="App">
      <div className="row">
        <div className="col-9">
          <h1 className="header">Supabase Auth + Storage</h1>
          <p className="">
            Experience our Auth and Storage through a simple profile management
            example. Create a user profile and upload an avatar image. Fast,
            simple, secure.
          </p>
        </div>
        <div className="col-3 auth-widget">
          {/* <AuthForm /> */}
          <button>
            {" "}
            <a href="/login">Login</a>
          </button>
        </div>
      </div>

      <div className="layout">
        <h3>List of stuff</h3>
        <Reorder.Group
          axis="y"
          onReorder={setItems}
          values={items}
          className="card_wrapper"
        >
          {items.map((item) => (
            <Item key={item} item={item} drag />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
function Item({ item }: any) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      className="card"
      drag
    >
      <h4>List Item {item}</h4>
      <p>this is inside the card</p>
      <span className="dragger">
        <ReorderIcon dragControls={dragControls} />
      </span>
    </Reorder.Item>
  );
}

const posts = [0, 1, 2, 3, 4, 5, 6, 7, 8];
