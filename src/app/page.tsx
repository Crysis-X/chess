"use client";

import Turn from "@/components/Turn/Turn";
import Chess from "@/modules/Chess/Chess";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [game, setGame] = useState<Chess | undefined>();
  const board = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setGame(new Chess("double"));
  }, []);
  useEffect(() => {
    if (!game) return;
    game.actions.whenPawnOnEnd = () => "queen";
    game.actions.whenKingIsKilled.push((winner) => {
      toast("Выграли: " + (winner == "black" ? "чёрные" : "белые"));
      game.removeinteract();
    });
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
