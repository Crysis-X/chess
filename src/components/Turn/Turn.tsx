"use client";

import Chess from "@/modules/Chess/Chess";
import { useEffect, useState } from "react";

type Props = {
  game?: Chess;
};
export default function Turn(props: Props) {
  const [turn, setTurn] = useState<"white" | "black" | undefined>(
    props?.game?.getTurn() || "white",
  );
  useEffect(() => {
    if (!props.game) return;
    const length = props.game.actions.whenTurnToggled.push((turn) =>
      setTurn(turn),
    );
    return () => {
      if (!props.game) return;
      props.game.actions.whenTurnToggled[length - 1] = () => {};
    };
  }, [props.game]);
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {turn == "white" ? "Белые" : "Черные"}
    </h4>
  );
}
