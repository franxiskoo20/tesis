import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const SkeletonItem = ({ index }) => (
  <Grid item xs={12} sm={6} md={4} lg={12} key={index}>
    <Skeleton width="100%" animation="wave" height={80} />
    <Skeleton variant="rectangular" width="100%" height={118} />
  </Grid>
);

const LoadingSkeleton = ({ count = 1 }) => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(count)).map((_, index) => (
        <SkeletonItem key={index} index={index} />
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
