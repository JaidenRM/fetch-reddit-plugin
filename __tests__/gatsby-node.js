const { testPluginOptionsSchema } = require("gatsby-plugin-utils");
const pluginOptionsSchema = require("../gatsby-node");

// subreddit: string
// sortedBy: string
// allowOver18: boolean
// limit: number

describe(`pluginOptionsSchema`, () => {
  it(`Minimum configuration`, async () => {
    const opts = {
      subreddit: "test123",
    };
    const { isValid, errors } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      opts
    );

    expect(isValid).toBe(true);
    expect(errors).toEqual([]);
  });

  describe(`subreddit values`, () => {
    it(`Valid - string`, async () => {
      const opts = {
        subreddit: "valid",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Invalid - number`, async () => {
      const opts = {
        subreddit: 123,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"subreddit" must be a string`]);
    });

    it(`Invalid - empty string`, async () => {
      const opts = {
        subreddit: "",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"subreddit" is required`]);
    });
  });

  describe(`sortedBy values`, () => {
    it(`Valid - empty`, async () => {
      const opts = {
        subreddit: "test123",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - hot`, async () => {
      const opts = {
        subreddit: "test123",
        sortedBy: "hot",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - new`, async () => {
      const opts = {
        subreddit: "test123",
        sortedBy: "new",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - rising`, async () => {
      const opts = {
        subreddit: "test123",
        sortedBy: "rising",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Invalid - test123`, async () => {
      const opts = {
        subreddit: "test123",
        sortedBy: "test123",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"sortedBy" must be one of [hot, new, rising]`]);
    });

    it(`Invalid - empty string`, async () => {
      const opts = {
        subreddit: "test123",
        sortedBy: "",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"sortedBy" must be one of [hot, new, rising]`]);
    });

    it(`Invalid - boolean`, async () => {
      const opts = {
        subreddit: "test123",
        sortedBy: true,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"sortedBy" must be a string`]);
    });
  });

  describe(`allowOver18`, () => {
    it(`Valid - empty`, async () => {
      const opts = {
        subreddit: "test123",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - true`, async () => {
      const opts = {
        subreddit: "test123",
        allowOver18: true,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - false`, async () => {
      const opts = {
        subreddit: "test123",
        allowOver18: false,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Invalid - string`, async () => {
      const opts = {
        subreddit: "test123",
        allowOver18: "string",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"allowOver18" must be a boolean`]);
    });
  });

  describe(`limit values`, () => {
    it(`Valid - empty`, async () => {
      const opts = {
        subreddit: "test123",
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - 1`, async () => {
      const opts = {
        subreddit: "test123",
        limit: 1,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Valid - 100`, async () => {
      const opts = {
        subreddit: "test123",
        limit: 100,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(true);
      expect(errors).toEqual([]);
    });

    it(`Invalid - 0`, async () => {
      const opts = {
        subreddit: "test123",
        limit: 0,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"limit" must be between 1 and 100`]);
    });

    it(`Invalid - 101`, async () => {
      const opts = {
        subreddit: "test123",
        limit: 101,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"limit" must be between 1 and 100`]);
    });

    it(`Invalid - negative num`, async () => {
      const opts = {
        subreddit: "test123",
        limit: -1,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"limit" must be between 1 and 100`]);
    });

    it(`Invalid - boolean`, async () => {
      const opts = {
        subreddit: "test123",
        limit: true,
      };
      const { isValid, errors } = await testPluginOptionsSchema(
        pluginOptionsSchema,
        opts
      );

      expect(isValid).toBe(false);
      expect(errors).toEqual([`"limit" must be a number`]);
    });
  });
});
