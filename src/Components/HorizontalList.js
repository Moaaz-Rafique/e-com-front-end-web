// Material-UI
// v4.12.3
// Diamond Sponsors
// octopus
// doit-intl
// Image list
// Image lists display a collection of images in an organized image.
// tidelift
// Material-UI for enterprise. Save time and reduce risk. Managed open source — backed by maintainers.
// ad by Material-UI

// Image lists represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

// Basic image list
// A simple example of a scrollable image ImageList.

// Breakfast
// Tasty burger
// Camera
// Morning
// Hats
// Honey
// Vegetables
// Water plant
// Mushrooms
// Olive oil
// Sea star
// Bike
// <ImageList rowHeight={160} className={classes.imageList} cols={3}>
//   {itemData.map((item) => (
//     <ImageListItem key={item.img} cols={item.cols || 1}>
//       <img src={item.img} alt={item.title} />
//     </ImageListItem>
//   ))}
// </ImageList>
// Image list with titlebars
// This example demonstrates the use of the ImageListItemBar to add an overlay to each ImageListItem. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.

// December
// Breakfast
// Breakfast
// by: jill111
// Tasty burger
// Tasty burger
// by: director90
// Camera
// Camera
// by: Danson67
// Morning
// Morning
// by: fancycrave1
// Hats
// Hats
// by: Hans
// Honey
// Honey
// by: fancycravel
// Vegetables
// Vegetables
// by: jill111
// Water plant
// Water plant
// by: BkrmadtyaKarki
// Mushrooms
// Mushrooms
// by: PublicDomainPictures
// Olive oil
// Olive oil
// by: congerdesign
// Sea star
// Sea star
// by: 821292
// Bike
// Bike
// by: danfador
// Single line image list
// This example demonstrates a horizontal scrollable single-line image list of images. Horizontally scrolling image lists are discouraged because the scrolling interferes with typical reading patterns, affecting comprehension. One notable exception is a horizontally-scrolling, single-line image list of images, such as a gallery.

// Breakfast
// Breakfast
// Tasty burger
// Tasty burger
// Camera
// Camera
// Morning
// Morning
// Hats
// Hats
// Honey
// Honey
// Vegetables
// Vegetables
// Water plant
// Water plant
// Mushrooms
// Mushrooms
// Olive oil
// Olive oil
// Sea star
// Sea star
// Bike
// Bike
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
// import ImageListItemBar from '@material-ui/core/ImageListItemBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import itemData from './itemData';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 10000,
//   },
//   imageList: {
//     flexWrap: 'nowrap',
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: 'translateZ(0)',
//   },
//   title: {
//     color: theme.palette.primary.light,
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
// }));


// //  * The example data is structured as follows:
// //  *
// //  * import image from 'path/to/image.jpg';
// //  * [etc...]
// //  *
//  const itemData = [
//    {
//      img: 'image',
//      title: 'Image',
//      author: 'author',
//    }
//   ];

// export default function SingleLineImageList() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <ImageList className={classes.imageList} cols={2.5}>
//         {itemData.map((item) => (
//           <ImageListItem key={item.img}>
//             <img src={item.img} alt={item.title} />
//             <ImageListItemBar
//               title={item.title}
//               classes={{
//                 root: classes.titleBar,
//                 title: classes.title,
//               }}
//               actionIcon={
//                 <IconButton aria-label={`star ${item.title}`}>
//                   <StarBorderIcon className={classes.title} />
//                 </IconButton>
//               }
//             />
//           </ImageListItem>
//         ))}
//       </ImageList>
//     </div>
//   );
// }