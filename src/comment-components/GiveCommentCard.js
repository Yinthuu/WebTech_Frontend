import { useState, useRef } from "react";
import '../App.css';
import { FaStar } from "react-icons/fa";
import ImagesUploader from 'react-images-uploader';
import '../styles/commentstyle.css';
import '../styles/commentfont.css';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const colors = {
  orange: "#FFBA5A",
  white: "#FFFFFF"
};

function GiveCommentCard({product}) {
  const user = sessionStorage.getItem('userId');
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const fileInput = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFilesAry, setSelectedFilesAry] = useState([]);
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();


  const onSelectFile = (event) => { 
    const selectedFiles = event.target.files; 
    const selectedFilesAry = Array.from(selectedFiles);
    setSelectedFilesAry(selectedFilesAry);
    console.log(selectedFilesAry);
    console.log(Array.isArray(selectedFilesAry));

    const imagesAry = selectedFilesAry.map((file) => {
      return URL.createObjectURL(file)
    })
    console.log(imagesAry);

    setSelectedImages((previousImages) => previousImages.concat(imagesAry));
  };

  const handleClick = value => {
    setCurrentValue(value);
  };

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

//   const handleSubmit = async () => {
  
  
//   //upload image
//   const formData = new FormData();
//   for (let i = 0; i < selectedFilesAry.length; i++) {
//     formData.append('images', selectedFilesAry[i]);
//   }

//   try {
//     const res = await axios.post('http://localhost:8081/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log(res.data); // handle the response from the server
//   } catch (err) {
//     console.log(err); // handle error
//   }
  

// };


const handleSubmit = async () => {
  setProductId(product);
  setUserId(user);

  const commentData = {
    product: product,
    user: user,
    rating: currentValue,
    text: feedback,
    images: [],
  };

  //upload images
  const formData = new FormData();
  for (let i = 0; i < selectedFilesAry.length; i++) {
    formData.append('images', selectedFilesAry[i]);
  }

  try {
    const uploadRes = await axios.post('http://localhost:8081/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Response from upload image"+ uploadRes.data[0].filename); // handle the response from the server
    commentData.images = uploadRes.data[0].filename;
    //remove file extension
    const lastDotIndex = commentData.images.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      commentData.images = commentData.images.substring(0, lastDotIndex);
    }
  } catch (uploadErr) {
    console.log(uploadErr); // handle error
    return;
  }

  //create comment
  try {
    const commentRes = await axios.post('http://localhost:8081/comments', commentData);

    console.log("Response from comment"+commentRes.data); // handle the response from the server
    navigate(`/comment/view/${product}`);
    window.location.reload(); // reload the component
  } catch (commentErr) {
    console.log(commentErr); // handle error
  }
};

  return (
    <div style={styles.container}>
      <h5>Overall rating </h5>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.white}
              stroke={(colors.orange)}
              strokeWidth={30}
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <hr />

      <h5>Add a photo or video</h5>
      <label className="uploadImgLabel">
        + Upload Image
        <br />
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png, image/jpeg"
        />
      </label>

      <br></br>

      {selectedImages.length > 0 && (selectedImages.length > 1 ? (
        <p className="error"> <br/></p>
      ) : (
        ""
        ))
       }
      
        <div className="images">
            {selectedImages && 
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="image" >
                      <img src={image} height="250" width="200" alt="upload"></img>
                      <button onClick={() => setSelectedImages(selectedImages.filter((e) => e !== image))}>Delete</button>
                  </div>
                )
              })
            }
        </div>
      
        <hr />
        
      
         <h5>Add a written review</h5>
        <textarea
        id="feedback"
        placeholder="What did you like or dislike? What did you use this product for?"
        style={styles.textarea}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      
        <div >
          <button className="submitButton"  onClick={handleSubmit}>Submit</button>
        </div>

        
      </div>
      
      );
    }
    
    const styles = {
      container: {
      display: "flex",
      flexDirection: "column",
      },
      stars: {
      display: "flex",
      flexDirection: "row",
      },
      button: {
      border: "1px solid #a9a9a9",
      padding: 15,
      borderRadius: 3,
      width: 100,
      backgroundColor:"skyblue"
      },
      buttonContainer:{
      display: "flex",
      justifyContent: "center",
      },
      textarea: {
      borderRadius: 5,
      border: "1px solid #a9a9a9",
      padding: 13,
      margin: "10px 0",
      minHeight: 100
      }
      
      };
      
      export default GiveCommentCard;