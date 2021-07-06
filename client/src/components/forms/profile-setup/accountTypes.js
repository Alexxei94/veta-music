const accountTypes = [
  {
    key: 'artist',
    label: 'Artist',
    profileTypes: [
      { key: 'song-writer', label: 'Song writer' },
      { key: 'artist', label: 'Artist' },
      { key: 'song-writer-and-artist', label: 'Both' }
    ]
  },
  {
    key: 'label-distributor',
    label: 'Label/Distributor',
    profileTypes: [
      { key: 'label', label: 'Label' },
      { key: 'distributor', label: 'Distributor' },
      { key: 'label-and-distributor', label: 'Both' }
    ]
  },
  { key: 'content-creator', label: 'Content Creator' },
  {
    key: 'film-maker',
    label: 'Filmmaker',
    profileTypes: [
      { key: 'editor', label: 'Editor' },
      { key: 'director', label: 'Director' },
      { key: 'camera-operator', label: 'Camera Operator' },
      { key: 'film-maker', label: 'Film Maker' }
    ]
  }
];

export default accountTypes;
