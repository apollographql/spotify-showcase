import { rest, graphql } from 'msw';
import { graphql as graphqlRequest, buildSchema } from 'graphql';
// import { gql } from "graphql-tag";
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import SpotifySchema from '../../schema.graphql';
// import {
//   Action,
//   CurrentUserQuery,
//   CurrentUserQueryVariables,
//   IndexRouteQuery,
//   IndexRouteQueryVariables,
//   LikeControlQuery,
//   LikeControlQueryVariables,
//   PlaybackContextType,
//   PlaybackStateSubscriberQuery,
//   PlaybackStateSubscriberQueryVariables,
//   PlaybarQuery,
//   PlaybarQueryVariables,
//   RepeatMode,
//   SidebarQuery,
//   SidebarQueryVariables,
// } from '../types/api';

// const typeDefs = gql`
//   type Query {
//     hello: String
//     resolved: String
//   }
// `;




const typeDefs = `
  type Query {
    hello: String
    resolved: String
  }
`;
const schema = buildSchema(typeDefs);

// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
};

// console.log(SpotifySchema.loc?.source.body);
const resolvers = {
  Query: {
    // resolved: () => 'Resolved',
  },
};
export const executableSchema = addMocksToSchema({
  schema: makeExecutableSchema({
    typeDefs: schema || '',
    resolvers: resolvers,
  }),
  mocks,
});

export const handlers = [
  rest.post('https://accounts.spotify.com/api/token', (req, res, ctx) => {
    return res(
      ctx.json({
        expires_in: '10000000',
        access_token: 'foo',
        refresh_token: 'bar',
      })
    );
  }),
  graphql.operation(async (req, res, ctx) => {
    const { query } = await req.json();
    const payload = await graphqlRequest({
      schema,
      source: query,
      variableValues: req.variables,
      // rootValue: root,
    });
    console.log({query})
    return res(ctx.data(payload.data || {}));

    // console.log({ query });
    // const payload = await graphqlRequest({
    //   schema: schema,
    //   source: query,
    //   variableValues: req.variables,
    //   // rootValue: root,
    // });

    // return res(ctx.data(payload.data || {}), ctx.errors(payload.errors));
  }),
  // graphql.query<SidebarQuery, SidebarQueryVariables>(
  //   'SidebarQuery',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.data({
  //         me: {
  //           user: {
  //             id: 'alessbell',
  //             __typename: 'User',
  //           },
  //           playlists: {
  //             pageInfo: {
  //               offset: 0,
  //               limit: 50,
  //               hasNextPage: true,
  //               __typename: 'PageInfo',
  //             },
  //             edges: [
  //               {
  //                 node: {
  //                   id: '4tIPmkZMGXRUkpHrCavkFL',
  //                   images: [
  //                     {
  //                       url: 'https://i.scdn.co/image/ab67706c0000bebb6a373017b18fa4793569fcf0',
  //                       __typename: 'Image',
  //                     },
  //                   ],
  //                   uri: 'spotify:playlist:4tIPmkZMGXRUkpHrCavkFL',
  //                   name: 'React Rally 2023',
  //                   owner: {
  //                     id: '1228247189',
  //                     displayName: 'Jerel Miller',
  //                     __typename: 'User',
  //                   },
  //                   __typename: 'Playlist',
  //                 },
  //                 __typename: 'PlaylistEdge',
  //               },
  //             ],
  //             __typename: 'PlaylistConnection',
  //           },
  //           __typename: 'CurrentUser',
  //         },
  //       })
  //     );
  //   }
  // ),
  // graphql.query<
  //   PlaybackStateSubscriberQuery,
  //   PlaybackStateSubscriberQueryVariables
  // >('PlaybackStateSubscriberQuery', (req, res, ctx) => {
  //   return res(
  //     ctx.data({
  //       me: {
  //         player: {
  //           playbackState: {
  //             isPlaying: true,
  //             repeatState: RepeatMode.Off,
  //             shuffleState: false,
  //             actions: {
  //               disallows: [Action.Resuming],
  //               __typename: 'Actions',
  //             },
  //             context: {
  //               uri: 'spotify:playlist:3LFIBdP7eZXJKqf3guepZ1',
  //               __typename: 'PlaybackContext',
  //               type: PlaybackContextType.Playlist,
  //             },
  //             device: {
  //               id: 'ec18c375183551a52cdf9b7a40ea4afa1443f2aa',
  //               name: 'Alessia’s MacBook Pro',
  //               type: 'Computer',
  //               volumePercent: 100,
  //               __typename: 'Device',
  //             },
  //             item: {
  //               id: '0UqAvWzhcELcCniwuRtOcq',
  //               album: {
  //                 id: '6VGVb6lM4KBgRnOnoUUQRm',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67616d0000b2733d588b022326e5e3918d0db5',
  //                     __typename: 'Image',
  //                   },
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67616d00001e023d588b022326e5e3918d0db5',
  //                     __typename: 'Image',
  //                   },
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67616d000048513d588b022326e5e3918d0db5',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Album',
  //                 name: 'Night Traveler',
  //               },
  //               __typename: 'Track',
  //               name: 'What About Us',
  //               uri: 'spotify:track:0UqAvWzhcELcCniwuRtOcq',
  //               artists: [
  //                 {
  //                   id: '1dABGukgZ8XKKOdd2rVSHM',
  //                   uri: 'spotify:artist:1dABGukgZ8XKKOdd2rVSHM',
  //                   name: 'Lofi Fruits Music',
  //                   __typename: 'Artist',
  //                 },
  //                 {
  //                   id: '34b7j3TqM5ramjmt2mc8tB',
  //                   uri: 'spotify:artist:34b7j3TqM5ramjmt2mc8tB',
  //                   name: 'Chill Fruits Music',
  //                   __typename: 'Artist',
  //                 },
  //               ],
  //               durationMs: 130343,
  //             },
  //             progressMs: 41966,
  //             timestamp: 1693252108805,
  //             __typename: 'PlaybackState',
  //           },
  //           __typename: 'Player',
  //         },
  //         __typename: 'CurrentUser',
  //       },
  //     })
  //   );
  // }),
  // graphql.query<CurrentUserQuery, CurrentUserQueryVariables>(
  //   'CurrentUserQuery',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.data({
  //         me: {
  //           profile: {
  //             id: 'alessbell',
  //             displayName: 'alessbell',
  //             images: [
  //               {
  //                 url: 'https://i.scdn.co/image/ab67757000003b826b87670dfadee9f4bab4565c',
  //                 __typename: 'Image',
  //               },
  //               {
  //                 url: 'https://i.scdn.co/image/ab6775700000ee856b87670dfadee9f4bab4565c',
  //                 __typename: 'Image',
  //               },
  //             ],
  //             __typename: 'CurrentUserProfile',
  //           },
  //           __typename: 'CurrentUser',
  //         },
  //       })
  //     );
  //   }
  // ),
  // graphql.query<IndexRouteQuery, IndexRouteQueryVariables>(
  //   'IndexRouteQuery',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.data({
  //         featuredPlaylists: {
  //           message: 'Afternoon delight',
  //           edges: [
  //             {
  //               node: {
  //                 id: '37i9dQZF1DX4E3UdUs7fUx',
  //                 name: 'Afternoon Acoustic',
  //                 description: 'Unwind and let the afternoon unfold.',
  //                 uri: 'spotify:playlist:37i9dQZF1DX4E3UdUs7fUx',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f000000031cb21db1932b5c9139bbf136',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DWZZbwlv3Vmtr',
  //                 name: 'Focus Flow',
  //                 description: 'Uptempo instrumental hip hop beats.',
  //                 uri: 'spotify:playlist:37i9dQZF1DWZZbwlv3Vmtr',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f00000003724554ed6bed6f051d9b0bfc',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DXbYM3nMM0oPk',
  //                 name: 'Mega Hit Mix',
  //                 description:
  //                   'A mega mix of 75 favorites from the last few years! ',
  //                 uri: 'spotify:playlist:37i9dQZF1DXbYM3nMM0oPk',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f00000003db32a17c1f5291b19317b62e',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DXd5zUwdn6lPb',
  //                 name: 'Classical Focus',
  //                 description: 'Enhance your focus with classical music.',
  //                 uri: 'spotify:playlist:37i9dQZF1DXd5zUwdn6lPb',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f000000034d18fa0db15ef9298863a509',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DXc8kgYqQLMfH',
  //                 name: 'lush lofi',
  //                 description:
  //                   'The chillest instrumental lofi beats, certified lush.',
  //                 uri: 'spotify:playlist:37i9dQZF1DXc8kgYqQLMfH',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f00000003ab3519ed4943efbb0ed42d2c',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DWViBxWcYEI1b',
  //                 name: 'Contemporary Blend',
  //                 description:
  //                   'For those with a taste for both the new and the classic. Cover: Hozier',
  //                 uri: 'spotify:playlist:37i9dQZF1DWViBxWcYEI1b',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f000000031ef77e751687d19048a3e4c7',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DWYBO1MoTDhZI',
  //                 name: 'Good Vibes',
  //                 description:
  //                   'Set it off with these epic anthems. Only good vibes here!',
  //                 uri: 'spotify:playlist:37i9dQZF1DWYBO1MoTDhZI',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f00000003ed91f72d69d10c9805cf25b3',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DWTQwRw56TKNc',
  //                 name: 'Mellow Classics',
  //                 description:
  //                   'Relax with these timeless tunes. Cover: Yusuf / Cat Stevens',
  //                 uri: 'spotify:playlist:37i9dQZF1DWTQwRw56TKNc',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f00000003dcaa531fc10fdacf4bf3dbe1',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DX6GwdWRQMQpq',
  //                 name: "Feelin' Myself",
  //                 description:
  //                   "The hip-hop playlist that's a whole mood. Art By Laci Jordan; Cover: City Girls",
  //                 uri: 'spotify:playlist:37i9dQZF1DX6GwdWRQMQpq',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f0000000301b48eeb7bd6337c606e16b7',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //             {
  //               node: {
  //                 id: '37i9dQZF1DWZeKCadgRdKQ',
  //                 name: 'Deep Focus',
  //                 description:
  //                   'Keep calm and focus with ambient and post-rock music.',
  //                 uri: 'spotify:playlist:37i9dQZF1DWZeKCadgRdKQ',
  //                 images: [
  //                   {
  //                     url: 'https://i.scdn.co/image/ab67706f00000003d6d48b11fd3b11da654c3519',
  //                     __typename: 'Image',
  //                   },
  //                 ],
  //                 __typename: 'Playlist',
  //               },
  //               __typename: 'FeaturedPlaylistEdge',
  //             },
  //           ],
  //           __typename: 'FeaturedPlaylistConnection',
  //         },
  //       })
  //     );
  //   }
  // ),
  // graphql.query<PlaybarQuery, PlaybarQueryVariables>(
  //   'PlaybarQuery',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.data({
  //         me: {
  //           player: {
  //             devices: [
  //               {
  //                 id: 'ec18c375183551a52cdf9b7a40ea4afa1443f2aa',
  //                 name: 'Alessia’s MacBook Pro',
  //                 type: 'Computer',
  //                 __typename: 'Device',
  //               },
  //             ],
  //             __typename: 'Player',
  //           },
  //           __typename: 'CurrentUser',
  //         },
  //       })
  //     );
  //   }
  // ),
  // graphql.query<LikeControlQuery, LikeControlQueryVariables>(
  //   'LikeControlQuery',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.data({
  //         me: {
  //           episodesContains: [false],
  //           tracksContains: [false],
  //           __typename: 'CurrentUser',
  //         },
  //       })
  //     );
  //   }
  // ),
];
