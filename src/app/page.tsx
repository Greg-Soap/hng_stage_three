"use client";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useRaisedShadow } from "@/utils/useRaisedShadow";
import { ReorderIcon } from "@/components/dragIcon";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { imageGallerylist } from "./data";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [filteredImages, setFilteredImages] = useState(imageGallerylist);
  const supabase = createClientComponentClient();
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [supabase.auth]);
  return (
    <>
      <Navbar user={user} />
      <div className="hero">
        <h2 className="hero_lead">
          Empowering Your Gallery: Arrange with Simplicity.
        </h2>
      </div>
      <div className="App">
        <Reorder.Group
          axis="y"
          onReorder={setFilteredImages}
          values={filteredImages}
          className="card_wrapper"
        >
          {filteredImages.map((item) => (
            <Item key={item} imgUrl={item} user={user} id={item} />
          ))}
        </Reorder.Group>
      </div>
    </>
  );
}
interface ImageCardProps {
  id: string;
  imgUrl: string;
  user: User | undefined;
}
function Item({ imgUrl, id, user }: ImageCardProps) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={id}
      key={id}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      className="card"
      drag
    >
      <Image src={imgUrl} alt="Gallery" width={285} height={200} />
      {user && (
        <span className="dragger">
          <ReorderIcon dragControls={dragControls} />
        </span>
      )}
    </Reorder.Item>
  );
}
