import { Skeleton } from "@material-ui/lab";

const ProductSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rect" style={{ width: "100%", height: 180 }} />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  );
};
export default ProductSkeleton;
