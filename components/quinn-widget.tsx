import { Carousel, Popup, Stories } from "@quinninc/rn-core/index";
import { IWidgetTypes } from "@quinninc/rn-core/types/app.types";

interface Props {
  handle: string;
  widgettype: IWidgetTypes;
  layer: number;
}

function QuinnWidget({ handle, widgettype, layer }: Props) {
  switch (widgettype) {
    case "cards":
      return (
        <Carousel
          showLoader
          layer={layer}
          playlistId={`${handle}_CARD_${layer}`}
        />
      );
    case "story":
      return (
        <Stories
          showLoader
          layer={layer}
          playlistId={`${handle}_STORY_${layer}`}
        />
      );
    case "floating":
      return <Popup layer={1} playlistId={`${handle}_BUBBLE_${layer}`} />;
  }
}

export default QuinnWidget;
