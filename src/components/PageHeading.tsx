import { IPageHeading } from "@/types/pageHeading.types";

const PageHeading = ({
  title,
  message,
  titleStyle = "text-xl font-semibold text-app-foreground",
  messageStyle = "text-[10px]   font-semibold text-app-muted-foreground",
}: IPageHeading) => {
  return (
    <div>
      <h1 className={titleStyle}>{title}</h1>
      <p className={messageStyle}>{message}</p>
    </div>
  );
};

export default PageHeading;
