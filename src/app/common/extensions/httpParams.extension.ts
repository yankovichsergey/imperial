import { HttpParams } from '@angular/common/http';
// NOTE:SM: need square brackets for serialized array. Only PHP server.
HttpParams.prototype.toString = function() {
    const than = this;
    this.init();
    return this.keys()
        .map((key: string) => {
            let eKey = than.encoder.encodeKey(key);
            // NOTE:SM: in accordance with the agreement for array
            const n = eKey.indexOf('Collection');
            if (n > -1) {
                eKey = eKey + '[]';
            }
            return than.map.get(key).map((value: string) => {
                return eKey + '=' + than.encoder.encodeValue(value);
            }).join('&');
        }).join('&');
};
