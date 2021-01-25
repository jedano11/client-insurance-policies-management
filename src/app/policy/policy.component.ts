import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PolicyService } from './policy.service';
import { IPolicy } from './policy';

@Component({
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  pageTitle: string = 'Policy List';
  policies: IPolicy[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.getPolicies(param);
    }
  }

  getPolicies(id: string): void {
    this.policyService.getPolicies().subscribe({
      next: policies => {
        this.policies = policies.policies.filter(p => p.clientId === id);
      },
      error: err => (this.errorMessage = err)
    });
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }
}
