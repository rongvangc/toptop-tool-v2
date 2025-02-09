import { forwardRef, ForwardRefRenderFunction } from "react";
import { format } from "date-fns";

const PrintTemplate: ForwardRefRenderFunction<
  HTMLDivElement,
  { data: CommentTopTopData }
> = ({ data }, ref) => {
  if (!data) return null;

  return (
    <div ref={ref} className="p-2">
      <ul className="text-lg">
        <li>
          STT: <span className="font-bold">{data?.currentOrderNumber}</span>
        </li>
        <li>
          ID number: <span className="font-bold">{data?.userId}</span>
        </li>
        <li>
          ID người dùng: <span className="font-bold">{data?.uniqueId}</span>
        </li>
        <li>
          Biệt danh: <span className="font-bold">{data?.nickname}</span>
        </li>
        <li>
          Thời gian:{" "}
          <span className="font-bold">
            {data.createTime &&
              format(new Date(+data?.createTime), "HH:mm dd/MM/yyyy")}
          </span>
        </li>
        <li>
          Comment: <span className="font-bold">{data?.comment}</span>
        </li>
      </ul>
    </div>
  );
};

export default forwardRef(PrintTemplate);
