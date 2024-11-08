import { useState } from 'react';

const CreatePost = ({ addPost }) => {
  const [postText, setPostText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText || selectedFile) {
      const postData = {
        text: postText,
        file: selectedFile ? URL.createObjectURL(selectedFile) : null,
      };
      addPost(postData);
      setPostText('');
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Write your post..."
      />
      <input
        type="file"
        className="mb-3 p-2 border border-gray-300 rounded-lg"
        onChange={handleFileChange}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={handleSubmit}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
