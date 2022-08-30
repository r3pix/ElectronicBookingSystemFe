import { SelectModel } from './../models/select-model';
import { AddCategoryDto } from './../models/category/add-category.dto';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryListModel } from "../models/category/category-list-model";
import { GetPageableCategoryDto } from "../models/category/get-pageable-category.dto";
import { PaginationModel } from "../models/pagination-model";
import { BaseService } from "./base.service";
import {Response} from "../models/response"
import { Observable } from "rxjs";
import { UpdateCategoryDto } from '../models/category/update-category.dto';

@Injectable({
    providedIn: 'root',
  })
export class CategoryService extends BaseService{
    public controllerPath: string = 'Category';

    constructor(public http: HttpClient){
        super();
    }

    getPageableCategories(dto: GetPageableCategoryDto): Observable<Response<PaginationModel<CategoryListModel>>>{
        let httpParams = new HttpParams();

        if(dto.searchTerm != null)
            httpParams = httpParams.append('searchTerm',dto.searchTerm);

        httpParams = httpParams.append('pageSize', dto.pageSize);
        httpParams = httpParams.append('pageNumber', dto.pageNumber);
        httpParams = httpParams.append('orderBy', dto.orderBy);
        httpParams = httpParams.append('desc',dto.desc);

        return this.http.get<Response<PaginationModel<CategoryListModel>>>(this.apiPath+this.controllerPath+'/pageable', {params: httpParams});
    }

    addCategory(dto: AddCategoryDto){
      return this.http.post(this.apiPath+this.controllerPath,dto);
    }

    updateCategory(dto: UpdateCategoryDto){
      return this.http.put(this.apiPath+this.controllerPath,dto);
    }

    getForSelect() : Observable<Response<SelectModel<string>[]>>{
      return this.http.get<Response<SelectModel<string>[]>>(this.apiPath+this.controllerPath+'/GetForSelect');
    }
}
