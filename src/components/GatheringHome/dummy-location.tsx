import GatheringLocation from './gatheringlocationclass'

export const GatheringLocations: GatheringLocation[] = [
  {
    id: 'l1',
    location: '일본',
    hashtag: '#일본',
    imgURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAeFBMVEX////+AAD/ubn/9fX/5OT/srL/xcX/vLz/2tr/qKj/4eH+lJT/6Oj/+Pj+b2/+Li7/rKz+ODj+YWH/8PD+HBz/1NT+UVH/zMz+f3/+VVX+S0v+Wlr+ExP+i4v+Rkb+JCT+o6P+QED/hIT+PT3+dXX+lpb+Kyv+aGgfaNvJAAADdUlEQVR4nO3dgVLiMBDGcQNIEUFAqEUBFe/U93/Duw7jCZNyNG2yO1v/vyfofkObNFnSqysAAAAAAAAAAAAAAAAAAFCajvNimGXZsMjHU+2LUdfP5+vHlTu2elzP8772hWkpdr/cOfvbXPvy5GWfZ/P4ctf7STfSaH0xkIPfI+1LFZI91Uyk9DTUvlwB2SwgkdIs077kxIqPwERKH4X2ZSc02TRIpLSZaF96Ku8NEym9a198EoPQB8mp2UC7gPjmrRIpzbVLiO2udSR/ZyvaRUTVX0SIxLlFh96DxlESKY21S4llFC0S5zoy2Y8ZSUdCiXfjHHTg9hlEjsQ58xOV/jZ6Jlvro0+cQfjUQruodmJM1Xx32mW1cZMkEudutAtrLvaQ883u4NNkAameD+3Smtoli8S5nXZxzaS7c0o2757npJk8a5fXRJY0EucsLufHn8Ce2moXGC7V1OSbvUlK8kic0y4xVPsl6cusLVq/CGTyol1kmKFAJM7Z2l+/F8nkXrvMEEuRSJxbahca4FUoE0vDcdpp/bcn7ULr6wtF4pydjreeWCZ2XnrSrMJWsbMyKxaJnfl9/G2u86xsgMk9TpzraRdb061gJrfaxdYkM7E/sDK9b9fMF2amXWw9U8FIrMzaJqKZ2OgmjtuXdImNvqVCNBMbvfipN3ZO2XjjuRbN5Fq73FrS7+wcs7F4L5uJjaU2MvHxPPEx7vhk9ru+2Nj3ykUzsfF/dd53fLwXV2D9xMc6m4/1WJ/kur2N6YnswGNj2LliH7AK+8U+uQeKlW1AudYt5wz9NfBBKJIH7UIDSHQMl2wsPB7Q91iB/lgffdQV6Lf38b+MCgKZaJcYLH17+at2ieGSZ6JdYAOpX3rsvOoc2SeNZK9dXiNp+5Vs9Cd5OK+gAuda+Dj/pALn5FTgPKUKnLvlS/DXQPPns3GOXxXOe6zAuaAVYv5SOvErKU1inSO0MrNlftl0HyWSvZFGrZrqfknlf9baRcTWvrvaRsd0kEnL7yB06FFypE2fm5W+tWCDpv0GDx2Yu541bDIqb43tgQa7Xl0O4cSqg89WT28fkMizyS2LBmp/923dkbebeoaXV+A+f8pP5EixO78It1h3/bl61rKYv21O53KzzdsP/t7oP9PlOC+yLCvy8bJbb3kAAAAAAAAAAAAAAAAAADT3BzugNrnOETdrAAAAAElFTkSuQmCC',
  },
  {
    id: 'l2',
    location: '오사카',
    hashtag: '#일본',
    imgURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAeFBMVEX////+AAD/ubn/9fX/5OT/srL/xcX/vLz/2tr/qKj/4eH+lJT/6Oj/+Pj+b2/+Li7/rKz+ODj+YWH/8PD+HBz/1NT+UVH/zMz+f3/+VVX+S0v+Wlr+ExP+i4v+Rkb+JCT+o6P+QED/hIT+PT3+dXX+lpb+Kyv+aGgfaNvJAAADdUlEQVR4nO3dgVLiMBDGcQNIEUFAqEUBFe/U93/Duw7jCZNyNG2yO1v/vyfofkObNFnSqysAAAAAAAAAAAAAAAAAAFCajvNimGXZsMjHU+2LUdfP5+vHlTu2elzP8772hWkpdr/cOfvbXPvy5GWfZ/P4ctf7STfSaH0xkIPfI+1LFZI91Uyk9DTUvlwB2SwgkdIs077kxIqPwERKH4X2ZSc02TRIpLSZaF96Ku8NEym9a198EoPQB8mp2UC7gPjmrRIpzbVLiO2udSR/ZyvaRUTVX0SIxLlFh96DxlESKY21S4llFC0S5zoy2Y8ZSUdCiXfjHHTg9hlEjsQ58xOV/jZ6Jlvro0+cQfjUQruodmJM1Xx32mW1cZMkEudutAtrLvaQ883u4NNkAameD+3Smtoli8S5nXZxzaS7c0o2757npJk8a5fXRJY0EucsLufHn8Ce2moXGC7V1OSbvUlK8kic0y4xVPsl6cusLVq/CGTyol1kmKFAJM7Z2l+/F8nkXrvMEEuRSJxbahca4FUoE0vDcdpp/bcn7ULr6wtF4pydjreeWCZ2XnrSrMJWsbMyKxaJnfl9/G2u86xsgMk9TpzraRdb061gJrfaxdYkM7E/sDK9b9fMF2amXWw9U8FIrMzaJqKZ2OgmjtuXdImNvqVCNBMbvfipN3ZO2XjjuRbN5Fq73FrS7+wcs7F4L5uJjaU2MvHxPPEx7vhk9ru+2Nj3ykUzsfF/dd53fLwXV2D9xMc6m4/1WJ/kur2N6YnswGNj2LliH7AK+8U+uQeKlW1AudYt5wz9NfBBKJIH7UIDSHQMl2wsPB7Q91iB/lgffdQV6Lf38b+MCgKZaJcYLH17+at2ieGSZ6JdYAOpX3rsvOoc2SeNZK9dXiNp+5Vs9Cd5OK+gAuda+Dj/pALn5FTgPKUKnLvlS/DXQPPns3GOXxXOe6zAuaAVYv5SOvErKU1inSO0MrNlftl0HyWSvZFGrZrqfknlf9baRcTWvrvaRsd0kEnL7yB06FFypE2fm5W+tWCDpv0GDx2Yu541bDIqb43tgQa7Xl0O4cSqg89WT28fkMizyS2LBmp/923dkbebeoaXV+A+f8pP5EixO78It1h3/bl61rKYv21O53KzzdsP/t7oP9PlOC+yLCvy8bJbb3kAAAAAAAAAAAAAAAAAADT3BzugNrnOETdrAAAAAElFTkSuQmCC',
  },
]
