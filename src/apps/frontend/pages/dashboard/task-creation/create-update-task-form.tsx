import { useEffect } from "react";
import Modal from "../../../components/modal";
import FormControl from "../../../components/form-control";
import Input from "../../../components/input";
import CreateAndUpdateTaskFormHook from "./create-update-task-hook";
import Button from "../../../components/button";
import { ButtonKind, ButtonType } from "../../../types/button";
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import Select from "../../../components/select";
import { TaskStatus } from "../../../types/user-tasks";
import type { UserTaskResponse } from "../../../types";

interface CreateAndUpdateTaskFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task?: UserTaskResponse;
}

const taskStatusOptions = [
  { label: 'Pending', value: TaskStatus.PENDING },
  { label: 'In Progress', value: TaskStatus.IN_PROGRESS },
  { label: 'Completed', value: TaskStatus.COMPLETED },
];

const CreateAndUpdateTaskForm: React.FC<CreateAndUpdateTaskFormProps> = ({
  isOpen,
  setIsOpen,
  task,
}) => {
  const currentUser = useSelector(
    (state: RootState) => state.authUser,
  ).getUserByIdData;

  const userId = currentUser?._id || "";

  const { formik } = CreateAndUpdateTaskFormHook({
    task,
    onSuccess: () => setIsOpen(false),
    userId,
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("taskStatus", event.target.value);
  };

  const isUpdating = !!task?.taskId;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isUpdating ? "Update Task" : "Create Task"}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col gap-4"
      >
        <FormControl
          error={
            formik.errors.taskName && formik.touched.taskName
              ? formik.errors.taskName
              : ""
          }
          label="Task Name"
          gap={1}
        >
          <Input
            value={formik.values.taskName}
            onChange={formik.handleChange("taskName")}
            placeholder="Enter task name"
          />
        </FormControl>

        <FormControl
          error={
            formik.errors.taskDescription && formik.touched.taskDescription
              ? formik.errors.taskDescription
              : ""
          }
          label="Task Description"
          gap={1}
        >
          <Input
            value={formik.values.taskDescription}
            onChange={formik.handleChange("taskDescription")}
            placeholder="Enter task description"
          />
        </FormControl>

        <FormControl error="" label="Status" gap={1}>
          <Select
            name="taskStatus"
            options={taskStatusOptions}
            handleChange={handleStatusChange}
            isLoading={false}
          />
        </FormControl>
        
        <FormControl
          error={
            formik.errors.taskDueDate && formik.touched.taskDueDate
              ? formik.errors.taskDueDate as string
              : ""
          }
          label="Due Date"
          gap={1}
        >
          <Input
            type="date"
            value={formik.values.taskDueDate}
            onChange={formik.handleChange("taskDueDate")}
          />
        </FormControl>

        <div className="mt-4 flex w-full justify-end gap-3">
          <Button kind={ButtonKind.DISCARD} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>

          <Button
            kind={ButtonKind.PRIMARY}
            type={ButtonType.SUBMIT}
          >
            {isUpdating ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAndUpdateTaskForm;
