"use client";

import Turn from "@/components/Turn/Turn";
import Chess from "@/modules/Chess/Chess";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  const [game, setGame] = useState<Chess | undefined>();
  const board = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setGame(new Chess("double"));
  }, []);
  useEffect(() => {
    if (!game) return;
    game.build().then(() => {
      if (!board.current) throw new Error("не найдено board");
      game.appendBoardInto(board.current);
      game.addInteract();
    });
  }, [game]);
  return (
    <>
      <div className="w-[100vw] h-[10vh] flex items-center justify-center">
        <Turn game={game} />
      </div>
      <section className="w-[100vw] flex flex-col justify-center items-center">
        <div ref={board}></div>
      </section>
    </>
  );
}
