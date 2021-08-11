# fetch-reddit-posts-plugin

A plugin for Gatsby that is used to fetch data on posts (with images only atm) in a particular subreddit on Reddit.

This plugin will send an anonymous `GET` request to reddit based on the options you've configured this plugin with. The response will then be mapped into a simplified container where each post will represent a node that can be queried using Gatsby's GraphQL system. The images fetched have been turned into `File` nodes that allow you to utilise Gatsby Image to optimise image loading.

## Install

```bash
npm install fetch-reddit-plugin
```

OR

```bash
yarn add fetch-reddit-plugin
```

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    ...,
    // Declare the plugin and configure the options
    // More about them below
    {
      resolve: `fetch-reddit-plugin`,
      options: {
        subreddit: 'photoshopbattles',
        sortedBy: 'hot',
        allowOver18: false,
        limit: 25,
      },
    },
    ...
  ],
}
```

## Options

Here is a list of the options you can configure:

### subreddit (required)

This is the name of the subreddit you would like to fetch posts from.
This option expects a string and you must supply a value.

### sortedBy

This will determine what type of posts you get back and you can only choose from 'hot', 'new' or 'rising'. Based on your selection will determine how all the posts in this subreddit are sorted and then you will get `limit` number of posts back from the top. If you do not provide an option, 'hot' will be selected by default.

### allowOver18

This will filter out or leave in NSFW/18+ posts from the returned results depending on your configuration. `false` to filter out, `true` to leave in. The default option is `false`.

### limit

This will determine the number of posts that are returned from the Reddit API. You **may** not receive this number of posts back from this plugin though. This is due to posts being filtered out from things like not having an image in the post or being NSFW as examples. The default value for this is 25.

## How to query

Here is what you can use to query reddit post nodes:

```graphql
{
  allRedditPost {
    edges {
      node {
        createdTimestampUtc
        downVotes
        id
        img {
          height
          url
          width
        }
        postedBy
        title
        upVotes
        url
        remoteImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
}
```
