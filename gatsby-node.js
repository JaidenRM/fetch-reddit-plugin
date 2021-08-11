/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */

const fetch = require("node-fetch");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const REDDIT_POST_NODE_TYPE = `RedditPost`;

exports.onPreInit = () => console.log("Loaded fetch-reddit-plugin");

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    subreddit: Joi.string()
      .required()
      .description(`The name of the subreddit you'd like to get posts from`)
      .messages({
        "any.required": `"subreddit" needs to be specified so we know where to get the posts from.`,
      }),
    sortedBy: Joi.string()
      .valid("hot", "new", "rising")
      .default("hot")
      .description(
        `This will determine how the posts will be sorted. Valid options here are 'hot', 'new', 'rising'`
      ),
    allowOver18: Joi.boolean()
      .default(false)
      .description(
        `Whether or not to allow NSFW content to be returned if it is found.`
      ),
    limit: Joi.number()
      .ruleset.min(1)
      .max(100)
      .rule({ message: `"limit" must be between 1 and 100` })
      .default(25)
      .description(`The number of posts to return. Max is 100.`),
  });
};

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType },
  pluginOptions
) => {
  const { subreddit, sortedBy, limit, allowOver18 } = pluginOptions;
  const resp = await fetch(
    `https://www.reddit.com/r/${subreddit}/${sortedBy}.json?limit=${limit}`
  );
  const { data } = await resp.json();
  const { createNode } = actions;

  // valid reddit posts (has image)
  const validPosts = data.children.filter(
    (child) =>
      child.data.preview &&
      child.data.preview.enabled &&
      child.data.over_18 === allowOver18 &&
      child.data.preview.images &&
      child.data.preview.images.length > 0
  );

  // simplified reddit post
  const simplifiedPosts = validPosts.map((post) => ({
    id: post.data.id,
    img: {
      url: post.data.preview.images[0].source.url.replace(/amp;/gi, ""), // remove & for encoding issues
      height: post.data.preview.images[0].source.height,
      width: post.data.preview.images[0].source.width,
    },
    url: post.data.url,
    title: post.data.title,
    createdTimestampUtc: post.data.created_utc,
    postedBy: post.data.author,
    upVotes: post.data.ups,
    downVotes: post.data.downs,
  }));

  // loop through data and create Gatsby nodes
  simplifiedPosts.forEach((post) =>
    createNode({
      ...post,
      id: createNodeId(`${REDDIT_POST_NODE_TYPE}-${post.id}`),
      parent: null,
      children: [],
      internal: {
        type: REDDIT_POST_NODE_TYPE,
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    })
  );

  return;
};

// called each time a node is created
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === REDDIT_POST_NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.img.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    });

    if (fileNode) {
      node.remoteImage___NODE = fileNode.id;
    }
  }
};
