import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // console.log("listeners", transform);
  // console.log("attributes", attributes);

  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
          marginBottom: "5px",
        }}
      >
        <button
          className=""
          style={{ width: "100%", cursor: "default", border: "1px solid #ccc" }}
        >
          {props.id}
        </button>
        <span
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            padding: "5px 10px",
            border: "1px solid #000",
            background: "tan",
            cursor: "grab",
          }}
        >
          ⣿
        </span>
        <button
          type="button"
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            color: "red",
            border: "none",
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
