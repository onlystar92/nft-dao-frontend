import {createMuiTheme, decomposeColor, recomposeColor} from "@material-ui/core/styles";
import variant from "./variant";
import typography from "./typography";
import breakpoints from "./breakpoints";

const theme = variant => {
  return createMuiTheme(
    {
      spacing: 4,
      breakpoints: breakpoints,
      typography: typography,
      palette: variant.palette,
      darken: function (color, percent) {
        const values = decomposeColor(color).values;
        values.push(percent);

        return recomposeColor({
          type: "rgba",
          values
        })
      }
    },
    variant.name
  );
};

export default theme(variant);
