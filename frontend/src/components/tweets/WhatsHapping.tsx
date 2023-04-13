import parse from "html-react-parser";
// hooks
import { useWhatsHappingData } from "./hooks";
// components
import { Avatar, Button, FlexBox, PickFile, Touch } from "components/shared";
import { ChangeTextAreaEvent } from "constants/types";
import { ModHappyIcon, PhotoIcon } from "components/icons";

const WhatsHapping = () => {
  const { tweet, onSubmit, setTweet } = useWhatsHappingData();

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-1">
          <Avatar src="/images/profile.png" alt="user" size={3} />
        </div>
        <div className="col-11">
          <textarea
            className="tweet-enter fs-5 border-bottom"
            placeholder="What`s happing?"
            onChange={(e: ChangeTextAreaEvent) => setTweet(e.target.value)}
          ></textarea>
          <div className="row">
            <div className="col-10">
              <FlexBox>
                <PickFile color="text-dark" icon={<PhotoIcon />} />
                <Touch>
                  <div className="h-100 h-100">
                    <ModHappyIcon  />
                  </div>
                </Touch>
              </FlexBox>
            </div>
            <div className="col-2">
              <Button className="tweet-btn" type="submit" fullWidth>
                Tweet
              </Button>
            </div>
          </div>
          <div style={{ whiteSpace: "pre-line" }}>
            {parse(tweet.replace(/(?:\r\n|\r|\n)/g, "<br />"))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default WhatsHapping;
