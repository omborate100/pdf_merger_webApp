import logo from './logo.svg';
import './App.css';
import FileUploader from './Components/FileUploader';

function App() {
  return (
    <div className="App">
      <h1> Merge PDF files </h1>
      <h4>Combine PDFs in the order you want with the easiest PDF merger available.</h4>
      <FileUploader/>
    </div>
  );
}

export default App;
