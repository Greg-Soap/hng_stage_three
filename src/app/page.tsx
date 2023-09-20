"use client";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useRaisedShadow } from "@/utils/useRaisedShadow";
import { ReorderIcon } from "@/components/dragIcon";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [items, setItems] = useState(posts);
  return (
    <div className="App">
      <Reorder.Group
        axis="y"
        onReorder={setItems}
        values={items}
        className="card_wrapper"
      >
        {items.map((item) => (
          <Item key={item} item={item} user={user} drag />
        ))}
      </Reorder.Group>
    </div>
  );
}
function Item({ item, user }: any) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={user && dragControls}
      className="card"
      drag
    >
      <h4>List Item {item}</h4>
      <p>this is inside the card</p>
      {user && (
        <span className="dragger">
          <ReorderIcon dragControls={dragControls} />
        </span>
      )}
    </Reorder.Item>
  );
}

const posts = [0, 1, 2, 3, 4, 5, 6, 7, 8];
