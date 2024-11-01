import { randomUUID } from "crypto";
import {
  addToQueue,
  DEFAULT_PACKAGE_NAME,
  DEFAULT_SEGMENT_SIZE,
  packageQueue,
  transcodeQueue,
} from "bolt";
import { Elysia, t } from "elysia";
import {
  AudioCodecSchema,
  LangCodeSchema,
  VideoCodecSchema,
} from "shared/typebox";
import { authUser } from "./token";
import { DeliberateError } from "../errors";
import { getJob, getJobLogs, getJobs } from "../repositories/jobs";
import { JobSchema } from "../types";

export const jobs = new Elysia()
  .use(authUser)
  .post(
    "/transcode",
    async ({ body }) => {
      const data = {
        assetId: randomUUID(),
        segmentSize: DEFAULT_SEGMENT_SIZE,
        ...body,
      };
      const jobId = await addToQueue(transcodeQueue, data, {
        id: data.assetId,
      });
      return { jobId };
    },
    {
      detail: {
        summary: "Create transcode job",
        tags: ["Jobs"],
      },
      body: t.Object({
        inputs: t.Array(
          t.Union([
            t.Object({
              type: t.Literal("video"),
              path: t.String({
                description:
                  "The source path, starting with http(s):// or s3://",
              }),
              height: t.Optional(t.Number()),
            }),
            t.Object({
              type: t.Literal("audio"),
              path: t.String({
                description:
                  "The source path, starting with http(s):// or s3://",
              }),
              language: t.Optional(LangCodeSchema),
              channels: t.Optional(t.Number()),
            }),
            t.Object({
              type: t.Literal("text"),
              path: t.String({
                description:
                  "The source path, starting with http(s):// or s3://",
              }),
              language: LangCodeSchema,
            }),
          ]),
          {
            description:
              "Source input types. Can refer to the same file, eg: when an mp4 contains " +
              "both audio and video, the same source can be added for both video and audio as type.",
          },
        ),
        streams: t.Array(
          t.Union([
            t.Object({
              type: t.Literal("video"),
              codec: VideoCodecSchema,
              height: t.Number(),
              bitrate: t.Optional(t.Number({ description: "Bitrate in bps" })),
              framerate: t.Optional(
                t.Number({ description: "Frames per second" }),
              ),
            }),
            t.Object({
              type: t.Literal("audio"),
              codec: AudioCodecSchema,
              bitrate: t.Optional(t.Number({ description: "Bitrate in bps" })),
              language: t.Optional(LangCodeSchema),
              channels: t.Optional(t.Number()),
            }),
            t.Object({
              type: t.Literal("text"),
              language: LangCodeSchema,
            }),
          ]),
          {
            description:
              "Output types, the transcoder will match any given input and figure out if a particular output can be generated.",
          },
        ),
        segmentSize: t.Optional(
          t.Number({
            description: "In seconds, will result in proper GOP sizes.",
          }),
        ),
        assetId: t.Optional(
          t.String({
            format: "uuid",
            description:
              "Only provide if you wish to re-transcode an existing asset. When not provided, a unique UUID is created.",
          }),
        ),
        packageAfter: t.Optional(
          t.Boolean({
            description:
              "Starts a default package job after a succesful transcode.",
          }),
        ),
        group: t.Optional(
          t.String({
            description:
              'Groups the asset with an arbitrary value, such as "ad"',
          }),
        ),
      }),
      response: {
        200: t.Object({
          jobId: t.String(),
        }),
      },
    },
  )
  .post(
    "/package",
    async ({ body }) => {
      const data = {
        name: DEFAULT_PACKAGE_NAME,
        ...body,
      };
      const jobId = await addToQueue(packageQueue, data, {
        id: [data.assetId, data.name],
      });
      return { jobId };
    },
    {
      detail: {
        summary: "Create package job",
        tags: ["Jobs"],
      },
      body: t.Object({
        assetId: t.String({
          format: "uuid",
        }),
        language: t.Optional(LangCodeSchema),
        segmentSize: t.Optional(
          t.Number({
            description:
              "In seconds, shall be the same or a multiple of the originally transcoded segment size.",
          }),
        ),
        tag: t.Optional(
          t.String({
            description:
              'Tag a job for a particular purpose, such as "ad". Arbitrary value.',
          }),
        ),
        name: t.Optional(
          t.String({
            description:
              'When provided, the package result will be stored under this name in S3. Mainly used to create multiple packaged results for a transcode result. We\'ll use "hls" when not provided.',
          }),
        ),
      }),
      response: {
        200: t.Object({
          jobId: t.String(),
        }),
      },
    },
  )
  .get(
    "/jobs",
    async () => {
      return await getJobs();
    },
    {
      detail: {
        summary: "Get all jobs",
        tags: ["Jobs"],
      },
      response: {
        200: t.Array(JobSchema),
      },
    },
  )
  .get(
    "/jobs/:id",
    async ({ params, query }) => {
      const job = await getJob(params.id, query.fromRoot);
      if (!job) {
        throw new DeliberateError({ type: "ERR_NOT_FOUND" });
      }
      return job;
    },
    {
      detail: {
        summary: "Get a job",
        tags: ["Jobs"],
      },
      params: t.Object({
        id: t.String(),
      }),
      query: t.Object({
        fromRoot: t.Optional(t.Boolean()),
      }),
      response: {
        200: JobSchema,
      },
    },
  )
  .get(
    "/jobs/:id/logs",
    async ({ params }) => {
      return await getJobLogs(params.id);
    },
    {
      detail: {
        summary: "Get job logs",
        tags: ["Jobs"],
      },
      params: t.Object({
        id: t.String(),
      }),
      response: {
        200: t.Array(t.String()),
      },
    },
  );