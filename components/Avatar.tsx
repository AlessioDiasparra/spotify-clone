import * as Avatar from "@radix-ui/react-avatar";

interface UserAvatarProps {
  src: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => {
  return (
    <Avatar.Root
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "100%",
        "verticalAlign": "middle",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <Avatar.Image
        style={{ width: "80%", height: "80%", objectFit: "cover", borderRadius: "inherit" }}
        src={src}
      />
      <Avatar.Fallback />
    </Avatar.Root>
  );
};
export default UserAvatar;
