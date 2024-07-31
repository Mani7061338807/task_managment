import {
  CalanderIcon,
  EditIcon,
  FavoriteIcon,
  PriorityIcon,
  ShareIcon,
  StarIcon,
} from "@/common/svg/IconPack";
import { createTask, updateTaskTodb } from "@/helpers/api-communicator";
import { taskModalcss } from "@/helpers/modalCSS";
import { useAppDispatch } from "@/redux/hook";
import { addTask, updateTask } from "@/redux/reducer/task";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const TaskModal = ({
  isModalOpen,
  onToggleModal,
  category,
  type,
  task,
}: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [status, setStatus] = useState(category || task?.status || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [deadline, setDeadline] = useState<Date | null>(task?.deadline || null);
  const [description, setDescription] = useState(task?.description || "");
  const dispatch = useAppDispatch();

  const handleUpdateTask = async () => {
    const res: any = await updateTaskTodb(
      task._id,
      title,
      description,
      status,
      priority,
      deadline
    );
    if (res.status === 200) {
      const updatedTask = res.data; 
      dispatch(updateTask({ taskId: task._id, updatedTask }));
      toast.success("Task updated");
      onToggleModal();
    }
  };
  const handleSubmit = async () => {
    if (type === "UPDATE") {
      handleUpdateTask();
    } else {
      const result: any = await createTask(
        title,
        description,
        status,
        priority,
        deadline
      );
      if (result.status === 201) {
        toast.success("New Task is created");
        dispatch(addTask(result.data));
        onToggleModal();
      }
    }
  };
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setStatus(category || task.status || "");
      setPriority(task.priority || "");
      setDeadline(task.deadline ? new Date(task.deadline) : null);
      setDescription(task.description || "");
    }
  }, [task, category]);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onToggleModal}
      ariaHideApp={false}
      style={taskModalcss}
    >
      <div className="bg-[#FFFFFF] h-[80vh] border-[1px] overflow-hidden border-[#DEDEDE] rounded-[17px] px-[50px] py-[30px] relative">
        <div className="flex justify-between mb-4">
          <div className="cursor-pointer" onClick={onToggleModal}>
            X
          </div>
          <div className="flex gap-2">
            <div className="cursor-pointer rounded-md py-2 px-2 bg-gray-300 flex gap-2">
              Share <ShareIcon />
            </div>
            <div className="cursor-pointer px-2 rounded-md py-2 bg-gray-300 flex gap-2">
              Favorite <FavoriteIcon />
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:outline-none py-2 px-2 text-[22px] font-serif"
          />
          <div className="flex gap-10">
            <div className="flex gap-2">
              <StarIcon /> Status
            </div>
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="cursor-pointer focus:outline-none"
            >
              <option value="Not specified">Not specified</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Under review">Under review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <PriorityIcon /> Priority
            </div>
            <select
              name="status"
              id="status"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="cursor-pointer focus:outline-none"
            >
              <option value="Not specified">Not specified</option>
              <option value="Urgent">Urgent</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <CalanderIcon /> Deadline
            </div>
            <input
              type="date"
              placeholder="Not specified"
              value={deadline ? deadline.toISOString().substr(0, 10) : ""}
              onChange={(e) =>
                setDeadline(e.target.value ? new Date(e.target.value) : null)
              }
            />
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2">
              {" "}
              <EditIcon /> description
            </div>
            <input
              type="text"
              placeholder="Not specified"
              className="px-2 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-6 text-[16px] text-black">
          + Add custom property
        </div>
        <div
          className="cursor-pointer mt-10 rounded-lg text-center px-2 py-2 text-white"
          style={{
            background: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)",
          }}
          onClick={() => handleSubmit()}
        >
          {type === "UPDATE" ? "Update" : "Create"}
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
type TaskModalProps = {
  isModalOpen: boolean;
  onToggleModal: () => void;
  category?: string;
  type?: string;
  task?: any;
};
