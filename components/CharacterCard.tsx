import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface CharacterCardProps {
  character: Character;
}
import { motion } from "framer-motion";
import { Character } from "@/types/Character";
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
   
  return (
    <Card className="w-[120px] sm:w-[180px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{character.name}</p>
        <small className="text-default-500">{character.species}</small>
        <h4 className="font-bold text-large">{character.status}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 justify-center flex">
        <motion.div whileHover={{scale:1.1}}>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={character.image}
          width={180}
        /></motion.div>
      </CardBody>
    </Card>
  );
};
export default CharacterCard;
