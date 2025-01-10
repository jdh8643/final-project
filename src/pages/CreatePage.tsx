import FeedForm from "../components/FeedForm";

const CreatePage = () => {
  return (
    <FeedForm pageTitle="글 추가">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">추가</button>
    </FeedForm>
  );
};

export default CreatePage;
