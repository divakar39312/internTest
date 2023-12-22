import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { context } from "../contextAPI";

const StaticksComponent = () => {

    const {data,monthRef} = useContext(context)

    const staticksData = data.staticksData

  return (
    <div className="staticks" ref={monthRef}>
        <Card sx={{ width:"calc(200px + 10vw)",display:"flex",justifyContent:"center" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Statisticks
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography component="div"> Total sale :{staticksData.totalSaleAmount}</Typography>
          <Typography component="div">Total sold item :{staticksData.soldItem}</Typography>
          <Typography component="div">Total not sold item :{staticksData.notSoldItem}</Typography>
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default StaticksComponent;
