interface MediaTypeProps {
  mediaType: string;
}

const MediaType = ({ mediaType }: MediaTypeProps) => {
  return (
    <div className="uppercase font-bold text-xs tracking-widest">
      {mediaType}
    </div>
  );
};

export default MediaType;
