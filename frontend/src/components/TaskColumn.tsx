import React, { useState } from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const TaskColumn = ({ category, tasks, onDropTask }: TaskColumnProps) => {
  const [isModal, setModal] = useState(false);
  const onToggleModal = () => {
    setModal(!isModal);
  };
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: any) => onDropTask(item.taskId, category),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const handleClick = () => {
    onToggleModal();
  };
  return (
    <div ref={drop} className={` ${isOver ? "bg-gray-200" : ""}`}>
      <ul className="min-h-[500px]">
        {tasks.map((task: any, index: number) => (
          <TaskCard key={task._id} task={task} index={index} />
        ))}
        <div
          className="px-2 py-1 flex justify-between items-center cursor-pointer rounded-lg text-[#E3E1E1]"
          style={{
            background: "linear-gradient(180deg, #3A3A3A 0%, #202020 100%)",
          }}
          onClick={() => handleClick()}
        >
          Add new
          <div className="text-[22px]">+</div>
        </div>
      </ul>
      <TaskModal
        isModalOpen={isModal}
        onToggleModal={onToggleModal}
        category={category}
      />
    </div>
  );
};

export default TaskColumn;

type TaskColumnProps = {
  category: string;
  tasks: any;
  onDropTask: any;
};
