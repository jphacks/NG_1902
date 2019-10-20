import json

def updateref(ref):
    f = open("reference.json",'w')
    json.dump(ref,f,indent=4)

if __name__ == '__main__':
    ref={"waittime":4,"getuptime":8,"uid":"uid","token":"1//0eu77X0wcThNfCgYIARAAGA4SNwF-L9Irl4HBYxi3Tl6-XSwsFhcChpB0gwsdBv_emUduNniuy5nV1cP7MW6wSf1FwkHeMw07BhQ"}
    updateref(ref)
