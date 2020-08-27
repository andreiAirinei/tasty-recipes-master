import React from 'react';

import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  RedditIcon
} from 'react-share';

// Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ShareButtons = ({ size, shareURL }) => {
  return (
    <div className='social-media-buttons'>
      <OverlayTrigger placement='top' overlay={<Tooltip>Share to Facebook!</Tooltip>}>
        <FacebookShareButton url={shareURL} className='mr-1'>
          <FacebookIcon size={size} round={true} />
        </FacebookShareButton>
      </OverlayTrigger>

      <OverlayTrigger placement='top' overlay={<Tooltip>Share to Twitter!</Tooltip>}>
        <TwitterShareButton url={shareURL} className='mr-1'>
          <TwitterIcon size={size} round={true} />
        </TwitterShareButton>
      </OverlayTrigger>

      <OverlayTrigger placement='top' overlay={<Tooltip>Share to Pinterest!</Tooltip>}>
        <PinterestShareButton media={shareURL} className='mr-1'>
          <PinterestIcon size={size} round={true} />
        </PinterestShareButton>
      </OverlayTrigger>

      <OverlayTrigger placement='top' overlay={<Tooltip>Share to Reddit!</Tooltip>}>
        <RedditShareButton url={shareURL} className='mr-1'>
          <RedditIcon size={size} round={true} />
        </RedditShareButton>
      </OverlayTrigger>




    </div>
  )
}

export default ShareButtons;
