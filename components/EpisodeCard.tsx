import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { Episode } from "@/types/Episode";
import translateDate from "@/utils/translateDate";
interface EpisodeCardProps {
  episode: Episode;
}
import { motion } from "framer-motion";
import Actions from "./Actions";
const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
    >
      <Card className="w-[400px]">
        <Link href={`/about/${episode.id}`}>
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md font-bold text-green-500 text-left">
                {episode.id} - {episode.name}
              </p>
              <p className="text-small font-bold text-left text-purple-600">
                {episode.episode}
              </p>
            </div>
          </CardHeader>
        </Link>

        <Divider />
        <CardBody>
          <p>Lançado em: {translateDate(episode.air_date)}</p>
        </CardBody>

        <Divider />
        <CardFooter>
          <p className="px-2">
            Quantidade de personagens: {episode.characters.length}
          </p>

          <Actions episode={episode} size={18} />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export default EpisodeCard;
